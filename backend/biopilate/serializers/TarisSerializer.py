from rest_framework import serializers
from ..models.tarifs import Tarifs

class TarifsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifs
        fields = ['id', 'description', 'price', 'create_at', 'updated_at', 'status', 'validete']
        read_only_fields = ['create_at', 'updated_at']
