from django.urls import path
from pinterest_app.api.v1 import views
from pinterest import settings

app_name = 'pinterest'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('crud/<str:obj>', views.Crud_ops.obj_list, name='obj_list'),
    path('crud/<str:obj>/<int:id>', views.Crud_ops.obj_deatails, name='obj_deatails'),
    path('crud/create/<str:obj>', views.Crud_ops.obj_create, name='obj_create'),
    path('crud/delete/<str:obj>/<int:id>', views.Crud_ops.obj_delete, name='obj_delete'),
    path('crud/update/<str:obj>/<int:id>', views.Crud_ops.obj_update, name='obj_update'),
    path('tags', views.tags_list, name='tags'),
]
