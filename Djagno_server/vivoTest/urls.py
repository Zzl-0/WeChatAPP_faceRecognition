from django.urls import path
from vivoTest.views import vivoTest

urlpatterns = [
    path('', vivoTest)
]