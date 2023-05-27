import base64
import json
import os
import datetime
from asyncio import Task

import face_recognition
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import cv2
# Create your views here.
from requests import Response
from rest_framework.decorators import api_view


# from rest_framework.views import APIView

def getImage(request):
    print("开始运行" + request.method)
    # basedir = os.path.dirname(__file__)  # 获取当前路径的上一级 极为s1
    # print("basedir = " + basedir)
    if request.method == 'POST':
        image = request.FILES['image']  # 获取上传的图片内容
        print(image)
        open_id = request.POST.get('openid')
        basedir = os.path.dirname(__file__)  # 获取当前路径的上一级 极为s1
        print("basedir = " + basedir)
        path = basedir + '\\static\\image\\'
        # 不能更新照片
        # 添加时间节点作为照片的更新
        now = datetime.datetime.now().strftime("%Y-%m-%d-%H")
        # if not os.path.exists(path + open_id + '.jpg'):  # 如何不为空
        with open(path +now+open_id + '.jpg', 'wb')as f:  # 转为二进制写入
            f.write(image.read())
            f.closed
            print("上传成功")
        # 上传成功后，对图片进行处理
        # 1. 获取图片路径？ 还是直接就能用
        # 将传过来的图片进行编码
        # myimage = "C:\\Users\\28893\\Desktop\\graduate_face_recognition\\Djagno_server\\face_server\\static\\image"
        # myimage 就是我上传的图片
        myimage = face_recognition.load_image_file(path+now+open_id+'.jpg')
        print(myimage)
        upImgEncoding = face_recognition.face_encodings(myimage)
        print("本地图片上传成功")
        # 将本地的图片进行编码，先将图片路径弄到，绝对路径
        staticImg = face_recognition.load_image_file(path+open_id+'.jpg')
        print("本地图片编码成功")
        staticImgEncoding = face_recognition.face_encodings(staticImg)
        print("上传图片编码成功")
        print(staticImgEncoding)
        match_results = face_recognition.compare_faces([upImgEncoding], staticImgEncoding[0])
        print("mathch_results:")
        print((match_results[0]))
        if (match_results[0].all()):
            print("比对成功")
            return HttpResponse('200')
    # else:
    return HttpResponse('400')


def firstgetImage(request):
    print("开始运行" + request.method)
    # basedir = os.path.dirname(__file__)  # 获取当前路径的上一级 极为s1
    # print("basedir = " + basedir)
    if request.method == 'POST':
        image = request.FILES['image']  # 获取上传的图片内容
        print(image)

        open_id = request.POST.get('openid')
        basedir = os.path.dirname(__file__)  # 获取当前路径的上一级 极为s1
        print("basedir = " + basedir)
        path = basedir + '\\static\\image\\'
        # 不能更新照片
        # if not os.path.exists(path + open_id + '.jpg'):  # 如何不为空
        with open(path + open_id + '.jpg', 'wb')as f:  # 转为二进制写入
            f.write(image.read())
            f.closed
            print("上传成功")
        # 进行base64加密
        with open(path + open_id + '.jpg', 'rb')as ff:
            content = ff.read()
            # 加密
            entxt = base64.b64encode(content)
            with open(path + open_id + '.txt', 'w')as fff:
                fff.write(str(entxt))
        
        return HttpResponse('200')
    # else:
    return HttpResponse('400')

def setImage(request):

    return JsonResponse({'imgurl':'face_server/static/image/'})