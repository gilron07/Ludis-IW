# Generated by Django 3.1.2 on 2020-10-27 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ludis_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]