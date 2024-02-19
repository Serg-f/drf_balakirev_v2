from rest_framework import generics

from musicians.models import Musician
from musicians.serializers import MusicianSerializer


class MusicianListAPIView(generics.ListCreateAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer


class MusicianAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer
