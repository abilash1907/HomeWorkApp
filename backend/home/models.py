from django.db import models

# Create your models here.
class Homework(models.Model):
    subject=models.CharField(max_length=20)
    work=models.TextField()
    due=models.DateField()
    complete=models.BooleanField(default=False)

    def __str__(self):
        return self.subject