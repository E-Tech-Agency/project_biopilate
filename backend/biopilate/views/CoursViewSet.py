from rest_framework import viewsets
from ..models.teaches import Cours
from ..serializers.CoursSerializer import CoursSerializer

class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer
