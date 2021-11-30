from rest_framework import serializers
from pinterest_app.models import User
from pinterest_app.api.v1.Factory import PinterestFactory

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        extra_fields = ['password2']
        exclude = ('followers', 'friends')
    def save(self, **kwargs):
        user = User()
        user.set_password(self.validated_data.get('password'))
        user.age = self.validated_data.get('age')
        user.email = self.validated_data.get('email')
        user.phone = self.validated_data.get('phone')
        user.avatar = self.validated_data.get('avatar')
        user.last_name = self.validated_data.get('last_name')
        user.first_name = self.validated_data.get('first_name')
        user.gender = self.validated_data.get('gender')
        user.save()

        return user

    def user_validate(self):
        if self.validated_data.get('password') != self.validated_data.get('password2'):
            raise serializers.ValidationError({'password': "Password doesn't match"})
        if self.validated_data.get('age') <= 0:
            raise serializers.ValidationError({'password': "age is not valid must be more than 0"})
    def set_gender(self):
        self.instance.gender = self.validated_data.get('gender')
        self.instance.save()