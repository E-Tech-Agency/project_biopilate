from rest_framework import viewsets ,permissions

from ..models.workshop import CategoryWorkShop, WorkShop
from ..serializers.WorkShopSerialisers import CategoryWorkShopSerializer, WorkShopSerializer

class CategoryWorkShopViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated] 
    queryset = CategoryWorkShop.objects.all()
    serializer_class = CategoryWorkShopSerializer
   

class WorkShopViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated] 
    queryset = WorkShop.objects.all().order_by('-created_at')
    serializer_class = WorkShopSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()

