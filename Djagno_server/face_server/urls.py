from django.urls import path
from face_server.views import *

urlpatterns = [
    path('get_Image/', getImage),
    path('firstImage/', firstgetImage),
    path('setImage/',setImage)
]