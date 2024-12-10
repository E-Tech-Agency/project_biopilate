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
        fields = ['id', 'title', 'author', 'description', 'favorites', 'image_1', 'image_2','view' ,'full_text', 'date', 'range', 'create_at', 'updated_at', 'status', 'images']
        read_only_fields = ['create_at', 'updated_at','tages']
        extra_kwargs = {
            'image_1': {'required': False},
            'image_2': {'required': False},
            ' images': {'required': False},
        }

    def get_admin_image(self, obj):
        if obj.image_1:
            return obj.admin_image_url(obj.image_1)
        elif obj.image_2:
            return obj.admin_image_url(obj.image_2)
        else:
            return 'No Image'

    def admin_image_url(self, image_field):
        return mark_safe('<img src="%s" width="150" height="150" />' % image_field.url)
