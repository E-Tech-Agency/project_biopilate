from rest_framework import viewsets
from ..models.planning import Category, Planning
from ..serializers.PlanningSerializer import CategorySerializer, PlanningSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PlanningViewSet(viewsets.ModelViewSet):
    queryset = Planning.objects.all()
    serializer_class = PlanningSerializer

@api_view(['GET', 'PUT'])
def planning_detail(request, pk):
    try:
        planning = Planning.objects.get(pk=pk)
    except Planning.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlanningSerializer(planning)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PlanningSerializer(planning, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)