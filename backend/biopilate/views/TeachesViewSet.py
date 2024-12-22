from rest_framework import viewsets ,permissions
from ..models.teaches import Teaches
from ..serializers.TeacheSerializer import TeachesSerializer


class TeachesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated] 
    queryset = Teaches.objects.all().order_by('-create_at')  # Order by create_at descending
    serializer_class = TeachesSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
    
    
    

    
