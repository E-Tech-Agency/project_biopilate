from rest_framework import serializers
from ..models.manuel_biopilates import Manuel

class ManuelSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Manuel
        fields = [
            'id', 'title', 'description', 'image',
           
            'created_at', 'updated_at', 'status'
        ]
        extra_kwargs = {
            'image': {'required': False},
           
        }
    
