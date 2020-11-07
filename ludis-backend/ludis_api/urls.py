from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from ludis_api.views import WorkoutViewSet, UserRegistrationView, UserLoginView

from django.urls import path
router = DefaultRouter()

router.register("workouts", WorkoutViewSet, basename='Workout')

url_patterns = router.urls

url_patterns += [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^signup', UserRegistrationView.as_view()),
    url(r'^signin', UserLoginView.as_view()),
]
