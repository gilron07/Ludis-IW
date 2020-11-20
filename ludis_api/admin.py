from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import User, Workout
# Register your models here.
admin.register(get_user_model())
admin.register(Workout)
