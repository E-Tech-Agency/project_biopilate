from rest_framework import viewsets
from ..models.planning import Category, Planning
from ..serializers.PlanningSerializer import CategorySerializer, PlanningSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PlanningViewSet(viewsets.ModelViewSet):
    queryset = Planning.objects.all()
    serializer_class = PlanningSerializer
