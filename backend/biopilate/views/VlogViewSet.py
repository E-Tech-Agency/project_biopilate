from rest_framework import viewsets

from ..models.vlog import Vlog , CategoryVlog
from ..serializers.vlogSerilizer import VlogSerializer , CategoryVlogSerializer
class CategoryVlogViewSet(viewsets.ModelViewSet):
    queryset = CategoryVlog.objects.all()
    serializer_class = CategoryVlogSerializer
   

class VlogViewSet(viewsets.ModelViewSet):
    queryset = Vlog.objects.all().order_by('-created_at')
    serializer_class = VlogSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()

