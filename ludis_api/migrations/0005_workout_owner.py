# Generated by Django 3.1.2 on 2020-10-27 09:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ludis_api', '0004_user_organization'),
    ]

    operations = [
        migrations.AddField(
            model_name='workout',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_workouts', to='ludis_api.user'),
            preserve_default=False,
        ),
    ]
