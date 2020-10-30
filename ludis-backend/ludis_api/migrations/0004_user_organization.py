# Generated by Django 3.1.2 on 2020-10-27 09:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ludis_api', '0003_organization'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='organization',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='organization', to='ludis_api.organization'),
        ),
    ]