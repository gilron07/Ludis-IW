from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from ludis_api.views import WorkoutViewSet, UserRegistrationView, UserLoginView

from django.urls import path
router = DefaultRouter()

router.register("workouts", WorkoutViewSet)

url_patterns = router.urls

url_patterns = [
    url(r'^signup', UserRegistrationView.as_view()),
    url(r'^signin', UserLoginView.as_view()),
]
