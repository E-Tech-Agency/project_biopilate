
from rest_framework import viewsets 
from ..models.sessionsplannig import CoursePlanning, SessionPlanning
from ..serializers.SessionSerializer import CourseSerializer, SessionSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

class CourseListPlannig(viewsets.ModelViewSet):
    
    queryset = CoursePlanning.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer
    @action(detail=True, methods=['get'])
    def sessions(self, request, pk=None):
        course = self.get_object()
        sessions = course.sessions.all()
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)
    

class SessionDetail(viewsets.ModelViewSet):
    queryset = SessionPlanning.objects.all().order_by('-created_at')
    serializer_class = SessionSerializer
    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=False, methods=['get'], url_path='by-course/(?P<course_id>\d+)')
    def get_by_course(self, request, course_id=None):
        """
        Custom endpoint to retrieve sessions by course ID.
        """
        sessions = SessionPlanning.objects.filter(course_id=course_id)
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)
    
class CourseListPlannigSessions(viewsets.ModelViewSet):
    queryset = CoursePlanning.objects.filter(status='confirmed').order_by('-created_at')
    serializer_class = CourseSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        courses = []

        for course in queryset:
            course_data = CourseSerializer(course).data
            course_data["sessions"] = SessionSerializer(course.sessions.all(), many=True).data
            courses.append(course_data)

        return Response(courses)


    