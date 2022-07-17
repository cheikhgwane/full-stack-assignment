from django.db import models
from .constant import STEPS, ReleaseStatus
import json


class Step:
    def __init__(self, name, state='off'):
        self.name = name
        self.state = state

    def update_state(self, state):
        self.state = state


class Release(models.Model):

    STEPS_CONST = json.dumps([Step(name).__dict__ for name in STEPS])

    name = models.CharField(max_length=50)
    date = models.DateField()
    status = models.CharField(max_length=10, default=ReleaseStatus.PENDING)
    info = models.TextField()
    steps = models.TextField(default=STEPS_CONST)
