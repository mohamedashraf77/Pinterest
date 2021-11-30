from rest_framework import serializers
from pinterest_app.models import pin_tags, Pin


class PinteresrSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = '__all__'

class TagsSerializer(serializers.ModelSerializer):
    PinteresrSerializer.Meta.model = Pin
    pin = PinteresrSerializer(many=True)
    class Meta:
        model = pin_tags
        fields = ['tag', 'pin']