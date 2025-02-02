from rest_framework import viewsets ,permissions
from ..models.FAQ import FAQ
from ..serializers.FAQSerializer import FAQSerializer

class FAQViewSet(viewsets.ModelViewSet):
    
    queryset = FAQ.objects.all().order_by('-create_at')
    serializer_class = FAQSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
