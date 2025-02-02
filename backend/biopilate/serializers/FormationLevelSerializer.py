from rest_framework import serializers
from ..models.formationbioplates import FormationBioPlates, FormationLevel
import requests
import logging

logger = logging.getLogger(__name__)
class FormationLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationLevel
        fields = ['id', 'name', 'price']

class FormationBioPlatesSerializer(serializers.ModelSerializer):
    levels = FormationLevelSerializer(many=True)

    class Meta:
        model = FormationBioPlates
        fields = ['id', 'title', 'image', 'description','formation_line', 'pdf_document', 'levels','status','created_at', 'updated_at']
        extra_kwargs = {
            'image': {'required': False},
            'pdf_document': {'required': False},
            'levels': {'required': False},
          
        }
    

    def create(self, validated_data):
        # Extract files explicitly before popping levels
        image = validated_data.pop('image', None)
        pdf_document = validated_data.pop('pdf_document', None)
        levels_data = validated_data.pop('levels', [])

        # Create formation instance with the files
        formation = FormationBioPlates.objects.create(
            image=image,
            pdf_document=pdf_document,
            **validated_data
        )

        # Create the levels
        for level_data in levels_data:
            FormationLevel.objects.create(formation=formation, **level_data)

        return formation

    def update(self, instance, validated_data):
        try:
            logger.info(f"Starting update with validated_data: {validated_data}")
            levels_data = validated_data.pop('levels', None)
            logger.info(f"Processing levels_data: {levels_data}")

            # Update the main instance fields
            for attr, value in validated_data.items():
                logger.info(f"Setting attribute {attr} to {value}")
                setattr(instance, attr, value)
            instance.save()

            # Handle levels update if provided
            if levels_data is not None:
                logger.info("Updating levels")
                # Delete existing levels
                instance.levels.all().delete()
                # Create new levels
                for level_data in levels_data:
                    logger.info(f"Creating level with data: {level_data}")
                    FormationLevel.objects.create(formation=instance, **level_data)

            return instance
        except Exception as e:
            logger.error(f"Error in serializer update method: {str(e)}", exc_info=True)
            raise