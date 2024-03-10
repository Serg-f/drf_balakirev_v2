from rest_framework import generics

from musicians.models import Musician, Instrument, Style
from musicians.serializers import MusicianSerializer, InstrumentSerializer, StyleSerializer


class MusicianListAPIView(generics.ListCreateAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer


class MusicianAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Musician.objects.all()
    serializer_class = MusicianSerializer


class InstrumentListAPIView(generics.ListAPIView):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


class StyleListAPIView(generics.ListAPIView):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer
