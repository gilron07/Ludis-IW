from rest_framework.routers import DefaultRouter

from ludis_api.views import WorkoutViewSet

router = DefaultRouter()

router.register("workouts", WorkoutViewSet)

url_patterns = router.urls