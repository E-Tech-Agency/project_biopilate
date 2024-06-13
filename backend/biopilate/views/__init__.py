from rest_framework import viewsets
from ..models.teaches import Teaches
from ..serializers.TeacheSerializer import TeachesSerializer

class TeachesViewSet(viewsets.ModelViewSet):
    queryset = Teaches.objects.all()
    serializer_class = TeachesSerializer
