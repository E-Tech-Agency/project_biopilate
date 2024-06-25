from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from .views.TarifsViewSet import TarifsViewSet
from .views.ServicesViewSet import ServicesViewSet
from .views.TagesViewSet import TagesViewSet
from .views.PlanningViewSet import CategoryViewSet, PlanningViewSet
from .views.FAQViewSet import FAQViewSet
from .views.BlogViewSet import BlogViewSet
from .views.FormationsViewSet import FormationsViewSet, OptionViewSet, SelectedOptionViewSet
from .views.CoursViewSet import CoursViewSet
router = DefaultRouter()
router.register(r'teaches', TeachesViewSet)
router.register(r'tarifs', TarifsViewSet)
router.register(r'services', ServicesViewSet)
router.register(r'tages', TagesViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'plannings', PlanningViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'formations', FormationsViewSet)
router.register(r'options', OptionViewSet)
router.register(r'selected-options', SelectedOptionViewSet)
router.register(r'cours', CoursViewSet)
urlpatterns = [
    path('', include(router.urls)),
]