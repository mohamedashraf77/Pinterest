from django.db import models
from django.contrib.auth.models import AbstractUser


class Board(models.Model):
    description = models.TextField(null= True, blank= True)
    title = models.CharField(null= True, blank= True, max_length= 100 )
    privacy = models.BooleanField(default= False)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    pin = models.ManyToManyField('pin')

class User(AbstractUser):
    username = None
    first_name = models.CharField(max_length=150, null= True, blank= True, default= 'image')
    last_name = models.CharField(max_length=150, null= True, blank= True)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, null= True, blank= True)
    avatar = models.ImageField(upload_to= 'pinterest_app/user_avatar', null= True, blank= True)
    age = models.IntegerField()
    gender = models.CharField(max_length= 10, choices= [('female', 'female'), ('male', 'male')], null= True, blank= True)
    followers = models.ManyToManyField(
        to='self',
        related_name='followees',
        symmetrical=False
    )
    friends = models.ManyToManyField('User', blank= True)
    tags = models.ManyToManyField('pin_tags', blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Pin(models.Model):
    title = models.CharField(max_length= 100 )
    alt_txt = models.CharField(max_length= 500, null= True, blank= True )
    description = models.TextField(null=True, blank=True)
    destination_link = models.URLField(null=True, blank=True)
    type = models.CharField(max_length=10, choices= [('image', 'image'), ('video', 'video')], default= 'image')
    url = models.ImageField(upload_to= 'pinterest_app/Pin', max_length=300)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    likes = models.IntegerField(blank=True, null=True)


# class Saved_pins(models.Model):
#     user = models.ForeignKey('User', on_delete=models.CASCADE)
#     pin = models.ForeignKey('Pin', on_delete=models.CASCADE)

class Comment_pins(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    pin = models.ForeignKey('Pin', on_delete=models.CASCADE)
    comment = models.TextField()


class freind_request(models.Model):
    from_user = models.ForeignKey('User', related_name= 'from_user', on_delete= models.CASCADE)
    to_user = models.ForeignKey('User', related_name= 'to_user', on_delete= models.CASCADE)

class Room(models.Model):
    subscribers = models.ManyToManyField(User, blank=True)
    name = models.CharField(max_length= 100)

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    message = models.TextField(null= True, blank= True)
    message_date = models.DateTimeField(auto_now_add= True)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    notification_date = models.DateTimeField(auto_now_add=True)

class pin_tags(models.Model):
    pin = models.ManyToManyField(Pin, blank=True)
    tag = models.CharField(max_length= 100, unique=True)
