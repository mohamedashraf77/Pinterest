from rest_framework import serializers
from pinterest_app.models import Board



class PinteresrSerializer(serializers.ModelSerializer):
    class Meta:
        model = None
        fields = '__all__'