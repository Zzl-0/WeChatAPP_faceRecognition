from django.urls import path
# from classInfo.views import *
from . import views

app_name = 'pizzas'

urlpatterns = [
    path('', views.amdinM, name='adminM'),

]