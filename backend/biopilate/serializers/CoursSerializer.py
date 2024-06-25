from rest_framework import serializers
from ..models.teaches import Cours
class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model =Cours
        fields= '__all__'
        read_only_fields = ['created_at', 'updated_at']