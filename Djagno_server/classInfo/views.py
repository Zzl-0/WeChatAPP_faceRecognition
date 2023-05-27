import pymysql
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from WX_api.models import TCourse
from WX_api.models import Chooseinfo

# Create your views here.


def addClassInfo(request):
    slesson = request.POST.get("slesson")
    userid = request.POST.get("userid")
    print(slesson)
    if(request.method == "POST"):
        # 在课程中添加数据
        try:
            TCourse.objects.create(
                c_name=slesson,
                tea_id=1
            )
        except pymysql.Error:
            print("pymysql:" + pymysql.Error)
        return HttpResponse('student_success')
    else:
        return HttpResponse('出错了,200')


def shwoClass(request):
    if (request.method == "POST"):
        classInfo = TCourse.objects.all().values("c_name","c_id")
        # print(classInfo)
    # 输出结果为：高等数学、测试教学、java测试、python测试
    # for i in classInfo:
    #     print(i.c_name)
    # 封装数据,并返回
    className = list(classInfo)

    return JsonResponse(className,safe=False)


def showChooseInfo(request):
    print(request)
    classID = request.GET.get('classID')
    # print(test)
    if (request.method == "GET"):
        # 接收课程的ID号，查看是那个课程
        # classID = request.GET.get("className")   # 只能在外面获取到，在if语句里面获取不到
        # print(classID)
        # 查询该课程所有学生的考勤情况
        chooseInfo = Chooseinfo.objects.filter(class_field=classID).values("stu_id","kqstate","stu__stu_name")
        # chooseInfo = Chooseinfo.objects.all().values("class_field","kqstate")
        print(chooseInfo)
        chooseInfojson = list(chooseInfo)
        return JsonResponse(chooseInfojson,safe=False)


def alterKqInfo(request):
    openid = request.POST.get("openid")
    print(openid)
    # 通过学生id进行修改考勤状态
    state = Chooseinfo.objects.filter(stu__openid="oMyW45HtAA9Crungf5dEvwvjQ0Jg",class_field='3').update(kqstate="已考勤")
    # state.kqstate = "已考勤"
    # state.save()
    print(state)
    return HttpResponse({'state':'ok'})


def showAll(request):

    return JsonResponse("",safe=False)