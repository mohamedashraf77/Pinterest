# Generated by Django 3.1.2 on 2021-11-27 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pinterest_app', '0007_auto_20211124_2015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin_tags',
            name='tag',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
