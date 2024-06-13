from google.auth.transport import requests
from google.oauth2 import id_token
from accounts.models import User
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

class GoogleAuth:
    @staticmethod
    def validate(access_token):
        try:
            id_info = id_token.verify_oauth2_token(access_token, requests.Request())
            print("id_info",id_info)
            return id_info
        except Exception as e:
            return 'token is invalid'

def register_social_user(provider,email,first_name,last_name,is_supplier):
    user = User.objects.filter(email=email)
    print("user",user)
    if user.exists():
        if provider == user[0].auth_provider:
            login_user = authenticate(email=email, password=settings.SOCIAL_AUTH_PASSWORD)
            user_tokens = login_user.tokens()
            print("tokend azefazf",user_tokens)
            return {
            'email':login_user.email,
            'full_name':login_user.get_full_name,
            "access_token":user_tokens.get('access_token'),
            "refresh_token":user_tokens.get('refresh_token'),
            'is_supplier':login_user.is_supplier,
            'is_superuser':login_user.is_superuser
        }
        else:
            raise AuthenticationFailed(
            detail=f"please continue with {user[0].auth_provider}"
        )
    else:
        new_user = {
            'email':email,
            'first_name':first_name,
            'last_name':last_name,
            'password':settings.SOCIAL_AUTH_PASSWORD,
            'is_supplier':is_supplier,

        }
        register_user=User.objects.create_user(**new_user)
        register_user.auth_provider=provider
        register_user.is_verified=True
        register_user.save()
        login_user = authenticate(email=email, password=settings.SOCIAL_AUTH_PASSWORD)
        user_tokens = login_user.tokens()
        return {
            'email':login_user.email,
            'full_name':login_user.get_full_name,
            "access_token":str(user_tokens.get('access_token')),
            "refresh_token":str(user_tokens.get('refresh_token')),
            'is_supplier':login_user.is_supplier,
            'is_superuser':login_user.is_superuser,
            'is_verified':login_user.is_verified
        }

