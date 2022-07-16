from django.db import models

class Release(models.Model):

    PENDING = 0
    ON_GOING = 1
    DONE = 2
    RELEASE_STATUS = ((PENDING, 'PENDING'),
                      (ON_GOING, 'ON_GOING'), (DONE, 'DONE'))

    name = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=RELEASE_STATUS)
    info = models.CharField(max_length=250)