from django.db import models


class Style(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Instrument(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Musician(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    age = models.PositiveIntegerField()
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    styles = models.ManyToManyField(Style)
    is_published = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
