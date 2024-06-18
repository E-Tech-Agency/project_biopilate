from rest_framework import serializers
from ..models.planning import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
class PlanningSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Planning
        fields = ['id', 'title', 'description', 'range','duree' , 'status', 'category', 'category_name', 'create_at', 'updated_at']
        read_only_fields = ['create_at', 'updated_at', 'category_name']