from rest_framework import serializers
from pinterest_app.models import pin_tags, Pin, Board


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

class PinSerializer(serializers.ModelSerializer):
    board_name = serializers.CharField()
    class Meta:
        model = Pin
        fields = '__all__'
        extra_fields = ['board_name']
        #fields = ['title', 'description', 'user', 'alt_txt', 'destination_link',]
    def save(self):
        pin = Pin()
        pin.title = self.validated_data.get('title')
        pin.description = self.validated_data.get('description')
        print(self.validated_data.get('user'))
        pin.user = self.validated_data.get('user')
        pin.url = self.validated_data.get('url')
        pin.alt_txt = self.validated_data.get('alt_text')
        pin.destination_link = self.validated_data.get('destination_link')
        pin.save()
        board_name = self.validated_data.get('board_name')
        board = Board.objects.get(title=board_name, user=pin.user)
        board.pin.add(pin)
        return pin

class BoardSerializer(serializers.ModelSerializer):
    PinteresrSerializer.Meta.model = Pin
    pin = PinteresrSerializer(many=True, required=False)
    class Meta:
        model = Board
        fields = ['description', 'pin', 'title', 'privacy', 'user', 'id']