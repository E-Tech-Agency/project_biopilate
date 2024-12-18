from rest_framework import serializers
from ..models.blog import Blog , BlogImage
from django.utils.html import mark_safe
from .TagesSerializer import TagesSerializer

class BlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = ['id', 'image']
class BlogSerializer(serializers.ModelSerializer):
    images = BlogImageSerializer(many=True, read_only=True)
    tages = TagesSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'author', 'description', 'favorites', 'image_1', 'image_2','view' ,'full_text', 'date', 'range', 'create_at', 'updated_at', 'status', 'images','tages']
        read_only_fields = ['create_at', 'updated_at','tages']
        extra_kwargs = {
            'image_1': {'required': False},
            'image_2': {'required': False},
            'images': {'required': False},
            'title': {'required': False},
            'author': {'required': False},
            'description': {'required': False},
            'full_text': {'required': False},
            'date': {'required': False},
            'range': {'required': False},
            'status': {'required': False},
            'favorites': {'required': False},
            'view': {'required': False},
            
        }

   