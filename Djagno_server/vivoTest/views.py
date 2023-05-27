import os
from django.http import HttpResponse
from utils.my_module import vivo
from django.shortcuts import render
# Create your views here.
import face_recognition
from imutils import face_utils
import numpy as np
import dlib
import cv2
import sys


def vivoTest(request):
    print("开始运行" + request.method)
    if request.method == 'POST':
        file_obj = request.FILES.get("file")
        print('file')
        print(file_obj)
        fileSize = file_obj.size
        print(fileSize)
        basedir = os.path.dirname(__file__)  # 获取当前路径的上一级 极为s1
        #     print("basedir = " + basedir)
        path = basedir + '\\video\\'
        print(path)
        with open(path+ '.mp4', 'wb+') as f:
            f.write(file_obj.read())
            f.close()
            print("mp4上传成功")
            # huoTiJianCe.liveness_detection()
        # liveness_detection()
    jieguo = vivo()
    print(jieguo)   # 获得object数据类型
    print(jieguo.get('blink_total'))  # 获得结果 0
    #     对是否眨眼或者张嘴进行判断
    if(jieguo.get('blink_total')!=0 or jieguo.get('mouth_total') != 0):
        print("返回yes的json格式")
        return HttpResponse("{\"isPeople\":\"yes\"}")
    else:
        print("返回no的json格式")
        return HttpResponse("{\"isPeople\":\"no\"}")
    # print(jieguo)  获得object数据类型
    # print(jieguo.get('blink_total'))   获得结果 0
        # return HttpResponse('ok')
    return HttpResponse('传输数据错误')

