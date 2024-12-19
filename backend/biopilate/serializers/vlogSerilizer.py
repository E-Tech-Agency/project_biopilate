from rest_framework import serializers
from ..models.vlog import Vlog, CategoryVlog

class CategoryVlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryVlog
        fields = ['id', 'name']

class VlogSerializer(serializers.ModelSerializer):
    category_vlog = serializers.CharField(
        source='category.name', read_only=True)

    class Meta:
        model = Vlog
        fields = [
            'id', 'title', 'description', 'image',
            'category', 'category_vlog', 
            'created_at', 'updated_at', 'status','date'
        ]
        extra_kwargs = {
            'image': {'required': False},
            
        }
    
