from rest_framework import viewsets
from ..models.formation import Formation, Option, FormationCategory
from ..serializers.FormSerializer import FormationsSerializer, OptionSerializer, SelectedOptionSerializer

class FormationsViewSet(viewsets.ModelViewSet):
    queryset = Formation.objects.all()
    serializer_class = FormationsSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class SelectedOptionViewSet(viewsets.ModelViewSet):
    queryset = FormationCategory.objects.all()
    serializer_class = SelectedOptionSerializer
