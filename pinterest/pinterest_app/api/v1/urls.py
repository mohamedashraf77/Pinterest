from django.urls import path
from pinterest_app.api.v1 import views

app_name = 'pinterest'
urlpatterns = [
    path('<str:obj>', views.Crud_ops.obj_list, name='obj_list'),
    path('<str:obj>/<int:id>', views.Crud_ops.obj_deatails, name='obj_deatails'),
]