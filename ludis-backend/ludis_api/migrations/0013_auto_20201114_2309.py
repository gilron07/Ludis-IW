# Generated by Django 3.1.2 on 2020-11-14 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ludis_api', '0012_report'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='duration',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
    ]
