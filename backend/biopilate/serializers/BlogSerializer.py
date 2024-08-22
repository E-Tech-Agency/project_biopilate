from rest_framework import serializers
from ..models.blog import Blog
from django.utils.html import mark_safe
class BlogSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Blog
        fields = ['id', 'title', 'author', 'description', 'favorites', 'image_1', 'image_2','view' ,'full_text', 'date', 'range', 'create_at', 'updated_at', 'status']
        read_only_fields = ['create_at', 'updated_at']
        extra_kwargs = {
            'image_1': {'required': False},
            'image_2': {'required': False},
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
