"""Djagno_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static # 添加本行
from django.conf import settings # 添加本行

urlpatterns = [
    path('',include('adminM.urls')),
    path('admin/', admin.site.urls),
    path('WX_api/', include('WX_api.urls')),
    path('user_info/', include('user_info.urls')),
    path('face/', include('face_server.urls')),
    path('myclass/', include('classInfo.urls')),
    path('vivoTest/', include('vivoTest.urls')),
#    添加自己写的接收照片的路径

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # 将文件路径添加进来
