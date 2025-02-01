from rest_framework import viewsets ,permissions

from ..models.manuel_biopilates import Manuel
from ..serializers.manuelSerializer import ManuelSerializer


class ManuelViewSet(viewsets.ModelViewSet):
    
    queryset = Manuel.objects.all().order_by('-created_at')
    serializer_class = ManuelSerializer

    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
