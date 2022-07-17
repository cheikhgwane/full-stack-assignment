# Generated by Django 4.0.6 on 2022-07-17 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('releases', '0002_release_steps_alter_release_info'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='release',
            name='status',
            field=models.CharField(choices=[(0, 'PENDING'), (1, 'ON_GOING'), (2, 'DONE')], default=0, max_length=1),
        ),
    ]
