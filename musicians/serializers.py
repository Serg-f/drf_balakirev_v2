from rest_framework import serializers

from musicians.models import Style, Instrument


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = ('id', 'name')

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = ('id', 'name')


class ListViewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    age = serializers.IntegerField()
    instrument = serializers.SerializerMethodField()
    styles = serializers.SerializerMethodField()
    is_published = serializers.BooleanField(required=False)
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    def get_styles(self, obj):
        styles = obj.styles.all()
        return StyleSerializer(styles, many=True).data

    def get_instrument(self, obj):
        return InstrumentSerializer(obj.instrument).data