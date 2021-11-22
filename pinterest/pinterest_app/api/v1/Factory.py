from pinterest_app.models import Board, User, Pin
from . import serializers as ser

class PinterestFactory:
    def __init__(self, model):
        self.model = self.get_model(model)

    def get_model(self, model):
        if model == 'board':
            ser.PinteresrSerializer.Meta.model = Board
            return Board.objects
        elif model == 'user':
            return User.objects
        elif model == 'pin':
            return Pin.objects

    def get_serialzer(self, model, **kwargs):
        print(kwargs)
        if model == 'board':
            ser.PinteresrSerializer.Meta.model = Board
        elif model == 'user':
            ser.PinteresrSerializer.Meta.model = User
        elif model == 'pin':
            ser.PinteresrSerializer.Meta.model = Pin

        return ser.PinteresrSerializer(**kwargs)