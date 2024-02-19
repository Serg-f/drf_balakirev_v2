from django.forms import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView

from musicians.models import Musician
from musicians.serializers import ListViewSerializer


class MusicianAPIListView(APIView):
    def get(self, request):
        musicians = Musician.objects.all()
        return Response({'musicians': ListViewSerializer(musicians, many=True).data})

    def post(self, request):
        print("request.data: ", request.data)
        serializer = ListViewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print("serializer.validated_data: ", serializer.validated_data)
        new_musician = Musician.objects.create(**serializer.validated_data)
        return Response({'musician': model_to_dict(new_musician)})
