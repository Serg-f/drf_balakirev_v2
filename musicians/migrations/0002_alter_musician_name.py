# Generated by Django 5.0.2 on 2024-02-19 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicians', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='musician',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]