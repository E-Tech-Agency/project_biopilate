import logging
from rest_framework import serializers
from .utils import GoogleAuth, register_social_user
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

# Configure logger
logger = logging.getLogger(__name__)

class GoogleAuthSerializer(serializers.Serializer):
    access_token = serializers.CharField(required=True)
    is_supplier = serializers.BooleanField(default=False)

    def validate(self, attrs):
        access_token = attrs.get('access_token')
        is_supplier = attrs.get('is_supplier')
        user_data = GoogleAuth.validate(access_token)
        print("user_data",user_data)
        # Log user data for debugging
        logger.debug("User data from Google: %s", user_data)
        if user_data == 'token is invalid':
            raise serializers.ValidationError("This token has expired or is invalid, please try again.")
        try:
            user_data['exp'] = int(user_data['exp'])
        except KeyError:
            raise serializers.ValidationError("This token has expired or is invalid, please try again.")
        
        if user_data.get('aud') != settings.GOOGLE_CLIENT_ID:
            raise AuthenticationFailed('Could not verify user.')

        user_id = user_data.get('sub', '')
        email = user_data.get('email', '')
        first_name = user_data.get('given_name', '')
        last_name = user_data.get('family_name', '')
        return register_social_user( 'google', email, first_name, last_name, is_supplier)
