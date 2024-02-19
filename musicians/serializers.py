from rest_framework import serializers
from musicians.models import Style, Instrument, Musician


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ('id', 'name')


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ('id', 'name')


class MusicianSerializer(serializers.ModelSerializer):
    instrument_details = InstrumentSerializer(source='instrument', read_only=True)
    styles_details = StyleSerializer(many=True, source='styles', read_only=True)
    instrument = serializers.PrimaryKeyRelatedField(queryset=Instrument.objects.all(), write_only=True)
    styles = serializers.PrimaryKeyRelatedField(queryset=Style.objects.all(), many=True, write_only=True)

    class Meta:
        model = Musician
        fields = ('id', 'name', 'description', 'age', 'instrument', 'instrument_details', 'styles', 'styles_details',
                  'is_published', 'created', 'updated')
        read_only_fields = ('created', 'updated')
