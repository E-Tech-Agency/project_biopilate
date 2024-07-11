from rest_framework import viewsets
from ..models.formation import Formation, Option, FormationCategory
from ..serializers.FormSerializer import FormationsSerializer, OptionSerializer, SelectedOptionSerializer

class FormationsViewSet(viewsets.ModelViewSet):
    queryset = Formation.objects.all().order_by('-created_at')
    serializer_class = FormationsSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class SelectedOptionViewSet(viewsets.ModelViewSet):
    queryset = FormationCategory.objects.all().order_by('-created_at')
    serializer_class = SelectedOptionSerializer
    def perform_update(self, serializer):
        # Override perform_update to prevent reordering after edit
        instance = serializer.save()
        # Refresh the instance to ensure it's up-to-date
        instance.refresh_from_db()
