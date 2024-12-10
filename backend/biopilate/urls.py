from django.urls import path, include
from rest_framework.routers import DefaultRouter


from .views.ServicesViewSet import ServicesViewSet
from .views.TagesViewSet import TagesViewSet
from .views.PlanningViewSet import CategoryViewSet, PlanningViewSet
from .views.FAQViewSet import FAQViewSet
from .views.BlogViewSet import BlogViewSet ,BlogImageViewSet
from .views.FormationsViewSet import FormationsViewSet, OptionViewSet, SelectedOptionViewSet
from .views.CoursViewSet import CoursViewSet , CategoryCoursViewSet
from .views.WorkShopViewSet import WorkShopViewSet, CategoryWorkShopViewSet
from .views.TeachesViewSet import TeachesViewSet
from .views.VlogViewSet import VlogViewSet ,CategoryVlogViewSet
router = DefaultRouter()
router.register(r'teaches', TeachesViewSet)

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
router.register(r'cours_category', CategoryCoursViewSet)
router.register(r'workshops-biopilate', WorkShopViewSet)
router.register(r'vlogs', VlogViewSet)
router.register(r'category-vlogs', CategoryVlogViewSet)
router.register(r'category-workshops', CategoryWorkShopViewSet)
router.register(r'blog-images', BlogImageViewSet, basename='blog-image')
urlpatterns = [
    path('', include(router.urls)),
]