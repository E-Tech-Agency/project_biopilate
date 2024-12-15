from rest_framework import serializers
from ..models.financer_fromation import FinancerFormation


class FinancerFormationSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = FinancerFormation
        fields = [
            'id', 'title', 'description', 'image',
            'pdf_financer_formation', 
            'created_at', 'updated_at', 'status'
        ]
        extra_kwargs = {
            'image': {'required': False},
            'pdf_financer_formation': {'required': False},
        }
    
