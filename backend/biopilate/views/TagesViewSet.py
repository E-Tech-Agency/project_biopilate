from rest_framework import viewsets
from ..models.tages import Tages
from ..serializers.TagesSerializer import TagesSerializer

class TagesViewSet(viewsets.ModelViewSet):
    queryset = Tages.objects.all()
    serializer_class = TagesSerializer
