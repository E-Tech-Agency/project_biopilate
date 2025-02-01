from rest_framework import viewsets ,permissions

from ..models.blog import Blog ,BlogImage
from ..serializers.BlogSerializer import BlogSerializer, BlogImageSerializer


class BlogViewSet(viewsets.ModelViewSet):
    
    queryset = Blog.objects.all().order_by('-create_at') 
    serializer_class = BlogSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
   
class BlogImageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing blog images.
    """
    queryset = BlogImage.objects.all()
    serializer_class = BlogImageSerializer
    
