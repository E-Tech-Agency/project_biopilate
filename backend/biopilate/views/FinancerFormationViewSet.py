from rest_framework import viewsets

from ..models.financer_fromation import FinancerFormation
from ..serializers.FinancerFormationSerializer import FinancerFormationSerializer

class FinancerFormationViewSet(viewsets.ModelViewSet):
    queryset = FinancerFormation.objects.all().order_by('-created_at')
    serializer_class = FinancerFormationSerializer

    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
