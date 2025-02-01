from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.files.uploadedfile import UploadedFile
from ..models.formationbioplates import FormationBioPlates
from ..serializers.FormationLevelSerializer import FormationBioPlatesSerializer
import json
import logging
from pprint import pformat
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
logger = logging.getLogger(__name__)

class FormationBioPlatesViewSet(viewsets.ModelViewSet):
    queryset = FormationBioPlates.objects.all().order_by('-created_at')
    serializer_class = FormationBioPlatesSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def create(self, request, *args, **kwargs):
        try:
            logger.info("=== Starting create request ===")
            logger.info(f"Content-Type: {request.content_type}")
            logger.info(f"Request FILES: {request.FILES}")
            logger.info(f"Request DATA: {request.data}")

            # Initialize the data dictionary
            data = {}

            # Handle basic fields
            for field in ['title', 'description', 'status']:
                if field in request.data:
                    data[field] = request.data[field]

            # Handle file fields
            if 'image' in request.FILES:
                data['image'] = request.FILES['image']
            if 'pdf_document' in request.FILES:
                data['pdf_document'] = request.FILES['pdf_document']

            # Handle levels data
            levels_str = request.data.get('levels')
            if levels_str:
                try:
                    if isinstance(levels_str, str):
                        data['levels'] = json.loads(levels_str)
                    else:
                        data['levels'] = levels_str
                except json.JSONDecodeError as e:
                    return Response({
                        'error': 'Invalid levels JSON format',
                        'detail': str(e)
                    }, status=status.HTTP_400_BAD_REQUEST)

            logger.info(f"Processed data before serialization: {data}")

            # Create serializer and validate
            serializer = self.get_serializer(data=data)
            if not serializer.is_valid():
                logger.error(f"Serializer validation errors: {serializer.errors}")
                return Response({
                    'error': 'Validation failed',
                    'detail': serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)

            # Save the formation
            formation = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response({
                'error': 'An unexpected error occurred',
                'error_type': type(e).__name__,
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            logger.info(f"Updating instance ID: {instance.id}")
            
            # Get the JSON data
            try:
                json_data = request.data.get('data')
                if isinstance(json_data, str):
                    data = json.loads(json_data)
                else:
                    data = json.loads(json_data.read().decode('utf-8'))
                logger.info(f"Parsed JSON data: {data}")
            except (json.JSONDecodeError, AttributeError) as e:
                logger.error(f"JSON decode error: {str(e)}")
                return Response({'error': 'Invalid JSON format'}, status=status.HTTP_400_BAD_REQUEST)

            # Handle file uploads
            if 'image' in request.FILES:
                data['image'] = request.FILES['image']
            
            if 'pdf_document' in request.FILES:
                data['pdf_document'] = request.FILES['pdf_document']

            # Use partial update
            serializer = self.get_serializer(instance, data=data, partial=True)
            
            if not serializer.is_valid():
                logger.error(f"Serializer validation errors: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            formation = serializer.save()
            
            return Response(serializer.data)

        except Exception as e:
            logger.error(f"Unexpected error in update: {str(e)}", exc_info=True)
            return Response({
                'error': 'An unexpected error occurred',
                'detail': str(e),
                'type': type(e).__name__
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
