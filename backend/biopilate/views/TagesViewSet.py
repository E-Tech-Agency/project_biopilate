from rest_framework import viewsets
from ..models.tages import Tages
from ..serializers.TagesSerializer import TagesSerializer

class TagesViewSet(viewsets.ModelViewSet):
    queryset = Tages.objects.all().order_by('-create_at') 
    serializer_class = TagesSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
