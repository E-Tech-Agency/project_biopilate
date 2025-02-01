from django.db import models
import datetime 
class CoursePlanning(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('confirmed', 'Confirmé'),
        ('cancelled', 'Annulé'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='courses_planning/', blank=True, null=True)  # Fixed folder name
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    decription_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def get_active_sessions(self):
        """Get all non-expired sessions"""
        return self.sessions.filter(end_date__gte=datetime.date.today())

    def get_upcoming_sessions(self):
        """Get future sessions"""
        return self.sessions.filter(start_date__gt=datetime.date.today())

    def get_current_sessions(self):
        """Get currently running sessions"""
        today = datetime.date.today()
        return self.sessions.filter(
            start_date__lte=today,
            end_date__gte=today
        )

    class Meta:
        verbose_name_plural = "biopilates Course Planning"

    def __str__(self):
        return self.title

class SessionPlanning(models.Model):
    course = models.ForeignKey(
        CoursePlanning, 
        on_delete=models.CASCADE, 
        related_name='sessions',  # Allows reverse lookup: course.sessions.all()
        verbose_name="Related Course"
    )
    start_date = models.DateField()
    end_date = models.DateField()
    schedule = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.course.title} - {self.start_date} to {self.end_date}"

    class Meta:
        verbose_name_plural = "biopilates Session Planning"
