from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
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
    @action(detail=True, methods=['post'], url_path='add-images')
    def add_images(self, request, pk=None):
        """
        Custom action to upload multiple images to a blog.
        """
        blog = self.get_object()
        images = request.FILES.getlist('images')
        for image in images:
            BlogImage.objects.create(blog=blog, image=image)
        return Response({"message": "Images added successfully."})
class BlogImageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing blog images.
    """
    queryset = BlogImage.objects.all()
    serializer_class = BlogImageSerializer
    
