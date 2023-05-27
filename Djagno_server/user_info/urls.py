from django.urls import path
from user_info import views

urlpatterns = [
    path('addInfo/', views.userInfo.as_view())
]