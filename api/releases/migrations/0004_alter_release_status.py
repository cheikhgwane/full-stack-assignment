# Generated by Django 4.0.6 on 2022-07-17 10:58

from django.db import migrations, models
import releases.constant


class Migration(migrations.Migration):

    dependencies = [
        ('releases', '0003_alter_release_date_alter_release_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='status',
            field=models.CharField(
                default=releases.constant.ReleaseStatus['PLANNED'], max_length=10),
        ),
    ]