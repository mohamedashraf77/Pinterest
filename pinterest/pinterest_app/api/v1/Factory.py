from pinterest_app.models import Board, pin_tags, Pin
from . import serializers as ser

class PinterestFactory:
    def __init__(self, model):
        self.model = self.get_model(model)

    def get_model(self, model):
        if model == 'board':
            return Board.objects
        elif model == 'pin':
            return Pin.objects
        elif model == 'tags':
            return pin_tags.objects

    def get_serialzer(self, model, **kwargs):
        if model == 'board':
            ser.PinteresrSerializer.Meta.model = Board
        elif model == 'pin':
            ser.PinteresrSerializer.Meta.model = Pin
        elif model == 'tags':
            return ser.TagsSerializer(**kwargs)

        return ser.PinteresrSerializer(**kwargs)