from rest_framework import serializers
from ..models.FAQ import FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'title', 'description', 'range', 'create_at', 'updated_at', 'status']
        read_only_fields = ['create_at', 'updated_at']
