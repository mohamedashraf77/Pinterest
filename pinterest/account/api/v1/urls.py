from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
  path('login', obtain_auth_token, name= 'api-login'),
  path('signup', views.signup, name= 'signup'),
  path('logout', views.logout, name= 'logout'),
  path('gender', views.set_gender, name= 'gender'),
  path('tags', views.set_tags, name= 'tags'),
  path('home', views.login_check, name= 'login_check'),
  path('update', views.userUpdate, name= 'update'),
  path('get', views.getuser, name= 'get'),
]