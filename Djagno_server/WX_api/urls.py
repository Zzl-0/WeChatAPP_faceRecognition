from django.contrib import admin
from django.urls import path, include
from WX_api import views
# from user_info import views

# 这里是主路由
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', views.LoginView.as_view()),

]
