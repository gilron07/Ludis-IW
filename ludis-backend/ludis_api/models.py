from django.db import models
from .utils.enums import Modifier


class Workout(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()


class Section(models.Model):
    name = models.CharField(max_length=64)
    #creator_id
    workout = models.ForeignKey(Workout, related_name='sections', on_delete=models.CASCADE)
    order = models.IntegerField(default=1)


class Drill(models.Model):
    drill_name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=1)
    #creator_id = ForeignKey
    section = models.ForeignKey(Section, related_name='drills', on_delete=models.CASCADE)


class DrillModifiers(models.Model):
    drill = models.ForeignKey(Drill, related_name='modifiers', on_delete=models.CASCADE)
    modifier = models.IntegerField(choices=Modifier.choices())
    unit = models.CharField(max_length=24, default=None, null=True) # consider switching to enum

    class Meta:
        unique_together = ('drill', 'modifier')


