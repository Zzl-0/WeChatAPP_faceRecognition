from django.urls import path
from classInfo.views import *

urlpatterns = [
    path('ClassInfo/', addClassInfo),
    path('showClass/', shwoClass),
    path('showChooseInfo/', showChooseInfo),
    path('alterKqInfo/', alterKqInfo),
]