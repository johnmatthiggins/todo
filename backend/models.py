from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    completed_at = models.DateField(blank=True, null=True)
    created_at = models.DateField(blank=False, auto_now_add=True)

    # not really relevant if the TODO has already been completed
    # this determines whether it is in the backlog...
    is_current = models.BooleanField(default=False)
