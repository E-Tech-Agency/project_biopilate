from rest_framework import viewsets
from ..models.blog import Blog
from ..serializers.BlogSerializer import BlogSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
