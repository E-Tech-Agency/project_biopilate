from rest_framework import viewsets
from ..models.services import Services
from ..serializers.ServiceSerializer import ServicesSerializer

class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
