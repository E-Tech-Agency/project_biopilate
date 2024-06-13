from rest_framework import serializers
from ..models.tages import Tages

class TagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tages
        fields = ['id', 'title', 'create_at', 'updated_at', 'status']
        read_only_fields = ['create_at', 'updated_at']
