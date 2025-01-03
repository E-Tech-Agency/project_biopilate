from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.generics import GenericAPIView,RetrieveAPIView,ListAPIView,UpdateAPIView,DestroyAPIView
from .utils import send_code_to_user,send_normal_email,send_contact_form_email
from .serializers import UserRegisterSerializer, UserLoginSerializer,PasswordResetSerializer,SetNewPasswordSerializer, LogoutUserSerializer,GetOneUserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import OneTimePassword,User
from django.utils.encoding import DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import json
from rest_framework.decorators import api_view
from django.utils.http import urlsafe_base64_decode
from django.core.exceptions import ValidationError
from .permissions import IsSupplier,IsAdmin,IsClient
from rest_framework.exceptions import PermissionDenied
# Create your views here.
@api_view(['POST'])
def send_contact_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        subject = data.get('subject')
        message = data.get('message')

        try:
            # Call the utility function to send the email
            send_contact_form_email(name, email, phone, subject, message)
            return JsonResponse({'message': 'Email sent successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            send_code_to_user(user['email'])
            return Response({
                'message': 'User created successfully',
                'data': user,
                },status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmailView(GenericAPIView):
    def post(self, request):
        try:
            passcode = request.data.get('otp')
            user_pass_obj=OneTimePassword.objects.get(code=passcode)
            user=user_pass_obj.user
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'account email verified successfully',
                }, status=status.HTTP_200_OK)
            return Response({'message':'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist:
            return Response({'message':'passcode not provided'}, status=status.HTTP_400_BAD_REQUEST)
        

class LoginUserView(GenericAPIView):
    serializer_class = UserLoginSerializer
    def post (self, request):
        serializer = self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'password reset successfully'}, status=status.HTTP_200_OK)

class VerifyPasswordResetView(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            # Decode the base64 user ID
            uid = force_str(urlsafe_base64_decode(uidb64))
            
            # Now use the decoded ID to get the user
            user = User.objects.get(id=uid)
            
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message': 'Token is invalid'}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({'message': 'Password reset successfully', 'success': True, 'token': token, 'id': user.id}, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError:
            return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError:
            return Response({'message': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        

class SetNewPasswordView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)

class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = (IsAuthenticated)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Logout successfully"}, status=status.HTTP_204_NO_CONTENT)
    

class Test(GenericAPIView):
    def get(self, request):
        return Response({"message": "Test"}, status=status.HTTP_200_OK)
    

class GetOneUserView(RetrieveAPIView):
    serializer_class = GetOneUserSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        user = self.request.user
        return user
    
class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = GetOneUserSerializer
    permission_classes = [IsAuthenticated]

class UpdateUserView(UpdateAPIView):
    serializer_class = GetOneUserSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        user = self.request.user
        return user
    def update(self, request, *args, **kwargs):
        # Ensure the user is an admin before allowing modification of specific fields
        if not request.user.IsAdmin:
            restricted_fields = {'is_client', 'is_staff', 'is_supplier', 'is_active', 'is_superuser', 'is_verified'}
            for field in restricted_fields:
                if field in request.data:
                    raise PermissionDenied(f"You are not allowed to modify the '{field}' field.")

        # Proceed with the update
        return super().update(request, *args, **kwargs)

class DeleteUserView(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated,IsAdmin]
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        reason = request.data.get('reason')
        send_normal_email({
            "email_subject": "User deleted",
            "email_body": f"User {user.first_name} {user.last_name} has been deleted for the following reason: {reason}",
            "to_email": user.email,
        })
        self.perform_destroy(user)
        return Response(status=status.HTTP_204_NO_CONTENT)