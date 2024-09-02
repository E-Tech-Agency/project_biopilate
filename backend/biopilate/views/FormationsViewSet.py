from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from ..models.formation import Formation, Option, FormationCategory
from ..serializers.FormSerializer import FormationsSerializer, OptionSerializer, SelectedOptionSerializer

class FormationsViewSet(viewsets.ModelViewSet):
    queryset = Formation.objects.all().order_by('-created_at')
    serializer_class = FormationsSerializer

    def perform_create(self, serializer):
        options_data = self.request.data.get('options', [])
        formation = serializer.save()

        for option_data in options_data:
            option_id = option_data.get('option')  # Get the option ID
            option = Option.objects.get(id=option_id)  # Fetch the actual option object
            FormationCategory.objects.create(
                formation=formation,
                option=option,
                price=option_data.get('price', 0)
            )

    def perform_update(self, serializer):
        options_data = self.request.data.get('options', [])
        instance = serializer.save()

        # Clear existing options
        FormationCategory.objects.filter(formation=instance).delete()

        # Add new options
        for option_data in options_data:
            option_id = option_data.get('option')  # Get the option ID
            option = Option.objects.get(id=option_id)  # Fetch the actual option object
            FormationCategory.objects.create(
                formation=instance,
                option=option,
                price=option_data.get('price', 0)
            )


class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class SelectedOptionViewSet(viewsets.ModelViewSet):
    queryset = FormationCategory.objects.all().order_by('-created_at')
    serializer_class = SelectedOptionSerializer

    def perform_create(self, serializer):
        option_data = self.request.data.get('option', {})
        option, created = Option.objects.get_or_create(name=option_data.get('name'))
        serializer.save(option=option)
