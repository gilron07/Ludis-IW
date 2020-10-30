from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from ludis_api.models import Workout, User
from ludis_api.serializers import WorkoutSerializer, UserRegistrationSerializer, UserLoginSerializer
from django.shortcuts import render


def index(request):
    return render(request, "build/index.html")


class WorkoutViewSet(ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        serializer.save(owner=User.objects.get(pk=1))


class UserRegistrationView(APIView):

    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            'success': 'True',
            'status code': status_code,
            'message': 'User registered  successfully',
            'user': serializer.data
            }
        return Response(response, status=status_code)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            'success': 'True',
            'status_code': status.HTTP_200_OK,
            'message': 'User logged in successfully',
            'token': serializer.data['token'],
            'role': serializer.data['role']
        }

        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
