from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_str
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import send_normal_email
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'confirm_password', 'is_supplier', 'phone_number', 'profile_image']
        extra_kwargs = {
            'profile_image': {'required': False},
        }

    def validate(self, attrs):
        password = attrs.get('password', '')
        confirm_password = attrs.get('confirm_password', '')
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            phone_number=validated_data.get('phone_number'),
            password=validated_data.get('password'),
            is_supplier=validated_data.get('is_supplier', False)
        )
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=155, min_length=6)
    password = serializers.CharField(max_length=68, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'access_token', 'refresh_token', 'is_supplier', 'is_superuser', 'phone_number', 'profile_image']
        extra_kwargs = {
            'profile_image': {'required': False},
        }

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email=email, password=password)

        if not user:
            raise AuthenticationFailed("Invalid credentials, try again")
        
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")

        tokens = user.tokens()
        return {
            'email': user.email,
            'full_name': user.get_full_name(),
            "access_token": str(tokens.get('access_token')),
            "refresh_token": str(tokens.get('refresh_token')),
            'is_supplier': user.is_supplier,
            'is_superuser': user.is_superuser
        }


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=155, min_length=6)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        user = User.objects.filter(email=email).first()
     

        if not user:
            raise serializers.ValidationError("Invalid email")
        
        if not user.is_verified:
            raise serializers.ValidationError("Email is not verified")

        uid64 = urlsafe_base64_encode(force_str(user.id).encode())  # Encode user ID
        token = PasswordResetTokenGenerator().make_token(user)
        request = self.context.get('request')
        site_domain = get_current_site(request).domain
        relative_link = reverse('password_reset_confirm', kwargs={'uidb64': uid64, 'token': token})
        abslink = f'http://{site_domain}{relative_link}'  # Use the actual site domain
        
        email_body = f"""Bonjour {user.first_name},

Vous pouvez réinitialiser votre mot de passe en cliquant sur le lien ci-dessous :

{abslink}

Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail.

Meilleures salutations,
L'équipe Studio Biopilates Paris


"""

        data = {
            'email_body': email_body,
            'email_subject': 'Réinitialiser votre mot de passe',
            'to_email': user.email
        }

        send_normal_email(data)
        return super().validate(attrs)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    id = serializers.CharField(max_length=255)
    token = serializers.CharField(max_length=255)

    class Meta:
        fields = ['password', 'confirm_password', 'id', 'token']

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        token = attrs.get('token')
        uid = attrs.get('id')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")
        
        try:
            user = User.objects.get(id=uid)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("Invalid token", 401)

            user.set_password(password)
            user.save()
            return user

        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid user ID")
        except Exception:
            raise serializers.ValidationError("Invalid token or user ID")


class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField(max_length=255)
    default_error_messages = {
        'bad_token': 'Invalid token'
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except Exception:
            raise self.fail('Invalid token')


class GetOneUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name','password' ,'phone_number', 'profile_image', 'is_superuser', 'is_verified', 'is_supplier', 'is_active', 'is_staff', 'date_joined', 'auth_provider']
        extra_kwargs = {
            'profile_image': {'required': False},
        }
