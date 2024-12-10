from rest_framework import serializers
from ..models.workshop import CategoryWorkShop, WorkShop

class CategoryWorkShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryWorkShop
        fields = ['id', 'name']

class WorkShopSerializer(serializers.ModelSerializer):
    category_cours = serializers.CharField(
        source='category.name', read_only=True)

    class Meta:
        model = WorkShop
        fields = [
            'id', 'title', 'description', 'image',
            'category', 'category_cours', 'pdf_workshop', 
            'created_at', 'updated_at', 'status'
        ]
        extra_kwargs = {
            'image': {'required': False},
            'pdf_workshop': {'required': False},
        }
    
