from django.db import models
from .constant import STEPS, ReleaseStatus
import json


class Step:
    def __init__(self, name, state='off'):
        self.name = name
        self.state = state


class Release(models.Model):

    def init_step():
        return [Step(name).__dict__ for name in STEPS]

    name = models.CharField(max_length=50)
    date = models.DateField()
    status = models.CharField(
        max_length=10, default=ReleaseStatus.PLANNED.name)
    info = models.TextField(null=True)
    steps = models.JSONField(default=init_step)
