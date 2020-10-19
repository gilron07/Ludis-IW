from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from ludis_api.models import Workout
from ludis_api.serializers import WorkoutSerializer


class WorkoutViewSet(ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer




