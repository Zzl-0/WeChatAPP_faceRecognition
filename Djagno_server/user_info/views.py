import base64

import pymysql
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.generic.base import View

# from models import TStudent
from rest_framework.response import Response
from rest_framework.views import APIView

from WX_api.models import TStudent


class userInfo(APIView):
    def post(self, request, *args, **kwargs):
        openid = request.data.get("id")
        # 对openid进行base64加密
        vret = base64.b64encode(openid.encode('utf-8')).decode('utf-8')
        print("openid加密后：")
        print(vret)

        quanxian = request.data.get('quanxian')
        stuName = request.data.get('realname')
        stuID = request.data.get('student_id')
        collegeclass = request.data.get('collegeclass')
        college = request.data.get('college')
        if quanxian == '0':  # 少些一个g 假设数据库没有该用户
            # print("userInfo:"+request.data.get("id"))
            # 进行数据的添加，要进行学生或者教师的判断
            try:
                TStudent.objects.create(
                    openid=openid,
                    stu_id=stuID,
                    stu_name=stuName,
                    college_name=college,  # 专业名称
                    class_name=collegeclass
                )
            except pymysql.Error:
                print("pymysql:"+pymysql.Error)
            return JsonResponse({'msg': '200', 'code': '200', 'Info': '1'})
        else:
            return JsonResponse({'msg': '404', 'code': '404', 'Info': '0'})

    def get(self, request, *args, **kwargs):
        openid = request.data.get("id")
        # 对openid进行base64加密
        vret = base64.b64encode(openid.encode('utf-8')).decode('utf-8')
        print("openid加密后：")
        print(vret)

        quanxian = request.data.get('quanxian')
        stuName = request.data.get('realname')
        stuID = request.data.get('student_id')

        if quanxian == '0':  # 少些一个g 假设数据库没有该用户
            # print("userInfo:"+request.data.get("id"))
            # 进行数据的添加，要进行学生或者教师的判断
            try:
                TStudent.objects.create(
                    openid=openid,
                    stu_id=stuID,
                    stu_name=stuName,
                )
            except pymysql.Error:
                print("pymysql:" + pymysql.Error)
            return JsonResponse({'msg': '200', 'code': '200', 'Info': '1'})
        else:
            return JsonResponse({'msg': '404', 'code': '404', 'Info': '0'})
        return Response("执行的get方法")
