# Generated by Django 5.0.6 on 2024-05-23 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_color_hexcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='productvariant',
            name='variant',
            field=models.CharField(default='NA', max_length=50),
        ),
    ]