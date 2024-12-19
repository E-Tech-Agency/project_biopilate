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

        # Validate Google token
        user_data = GoogleAuth.validate(access_token)
        logger.debug("User data received from Google: %s", user_data)

        if not isinstance(user_data, dict):
            logger.error("Invalid user data format from GoogleAuth.validate: %s", user_data)
            raise serializers.ValidationError("Invalid response format from Google.")

        if user_data == 'token is invalid':
            raise serializers.ValidationError("This token has expired or is invalid, please try again.")

        # Check for required fields and correct data types
        try:
            user_data['exp'] = int(user_data['exp'])
        except (KeyError, ValueError, TypeError):
            logger.error("Missing or invalid 'exp' field in user data: %s", user_data)
            raise serializers.ValidationError("This token has expired or is invalid, please try again.")

        # Verify audience field matches the client ID
        if user_data.get('aud') != settings.GOOGLE_CLIENT_ID:
            logger.error("Invalid 'aud' in user data: %s", user_data.get('aud'))
            raise AuthenticationFailed('Could not verify user.')

        # Extract required fields
        user_id = user_data.get('sub', '')
        email = user_data.get('email', '')
        first_name = user_data.get('given_name', '')
        last_name = user_data.get('family_name', '')

        if not all([user_id, email, first_name, last_name]):
            logger.error("Missing required fields in user data: %s", user_data)
            raise serializers.ValidationError("Missing required fields in Google user data.")

        # Call the function to register or fetch the user
        registered_user = register_social_user('google', email, first_name, last_name, is_supplier)
        
        # Ensure registered_user is JSON-serializable
        if not isinstance(registered_user, dict):
            logger.error("Non-serializable response from register_social_user: %s", registered_user)
            raise serializers.ValidationError("Internal server error. Please try again later.")

        return registered_user
