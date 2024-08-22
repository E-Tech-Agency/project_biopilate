from rest_framework import serializers
from ..models.teaches import Teaches

class TeachesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teaches
        fields = ['id', 'fullname', 'image', 'email', 'nomber_phone', 'specialite', 'create_at', 'updated_at', 'image']
        read_only_fields = ['create_at', 'updated_at']
        extra_kwargs = {
            'image': {'required': False},
        }
        

