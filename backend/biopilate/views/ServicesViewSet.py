from rest_framework import viewsets ,permissions
from ..models.services import Services
from ..serializers.ServiceSerializer import ServicesSerializer


class ServicesViewSet(viewsets.ModelViewSet):
   
    queryset = Services.objects.all().order_by('-create_at') 
    serializer_class = ServicesSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
