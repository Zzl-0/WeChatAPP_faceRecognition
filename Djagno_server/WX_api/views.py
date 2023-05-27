import pymysql
import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from Djagno_server import settings
# 导入models中的user模块，数据库


# Create your views here.
from WX_api.models import TStudent, TTea


class LoginView(APIView):
    #   本来在下面括号里    , request, *args, **kwargs
    def post(self, request, *args, **kwargs):
        # 1.获取用户唯一标识openid 和 身份权限（1--老师或者0--学生）
        wx_openid = request.data.get('openid')  # 获取微信的code 来取得微信的openID和session_Key
        user_identity = request.data.get('identity')
        # 2.连接数据库，查看用户是否第一次登录，是->保存信息，登录成功，否->登录成功，
        # 获取所有的值
        # answer = TWxUser.objects.all().values('openid')2
        # answer 是查出来的值
        # 根据identity的值来决定将信息加入到哪个数据表
        answer = TStudent.objects.filter(openid = wx_openid).first()

        # try:
        #     # answer = TStudent.objects.get(openid=wx_openid)
        #     # if TStudent.objects.get(openid=wx_openid) == '':
        #     if answer == '':
        #
        # except pymysql.Error:
        #     print("pymysql:" + pymysql.Error)
        print(answer)  # 没有返回NONE
        if answer == None:
            return Response({"statue": True, 'msg': '发送成功', 'userInfoTianXie': '0'})
        else:
            return Response({"statue": True, 'msg': '发送成功', 'userInfoTianXie': '1'})

        # print("数据库无数据，请添加")
        # if user_identity == 0:
        #     # print("加入到学生表")
        #     TStudent.objects.create(
        #         openid=wx_openid
        #     )
        # else:
        #     # print("加入到教师表")
        #     TTea.objects.create(tea_openid=wx_openid)
        # 3.登录模块完成
        # print(request.data)
        # print('openid is :',wx_openid)
        # return Response({"statue" : True, 'msg' : '发送成功'})
