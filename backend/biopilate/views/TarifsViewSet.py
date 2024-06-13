from rest_framework import viewsets
from ..models.tarifs import Tarifs
from ..serializers.TarisSerializer import TarifsSerializer

class TarifsViewSet(viewsets.ModelViewSet):
    queryset = Tarifs.objects.all()
    serializer_class = TarifsSerializer
