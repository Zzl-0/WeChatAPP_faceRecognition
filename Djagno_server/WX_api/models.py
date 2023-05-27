# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class TClass(models.Model):
    class_id = models.IntegerField()
    u_name = models.CharField(max_length=20)
    kq_time = models.DateTimeField(blank=True, null=True)
    student_num = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 't_class'


class TCourse(models.Model):
    c_id = models.AutoField(primary_key=True)
    c_name = models.CharField(max_length=15)
    tea = models.ForeignKey('TTea', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 't_course'


class TStudent(models.Model):
    stu_id = models.AutoField(primary_key=True)
    stu_name = models.CharField(max_length=15)
    class_name = models.CharField(max_length=15)
    college_name = models.CharField(max_length=15)
    face_url = models.CharField(max_length=100)
    openid = models.CharField(db_column='openID', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 't_student'


class TSysUser(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    introduce = models.TextField(blank=True, null=True)
    usertype = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 't_sys_user'


class TTea(models.Model):
    tea_id = models.AutoField(primary_key=True)
    tea_name = models.CharField(max_length=15)
    tea_openid = models.CharField(db_column='tea_openID', max_length=30)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 't_tea'


class TWxUser(models.Model):
    openid = models.CharField(max_length=50)
    class_id = models.IntegerField(blank=True, null=True)
    u_name = models.CharField(max_length=20, blank=True, null=True)
    face_encoding = models.TextField(blank=True, null=True)
    kao_qin = models.IntegerField(blank=True, null=True)
    picture_url = models.CharField(max_length=255, blank=True, null=True)
    student_num = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 't_wx_user'


class UserInfoTask(models.Model):
    create_time = models.DateTimeField(blank=True, null=True)
    words = models.TextField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    creator = models.CharField(max_length=20)
    title = models.CharField(max_length=255)
    message = models.CharField(max_length=255, blank=True, null=True)
    image = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_info_task'


class Chooseinfo(models.Model):
    opt_id = models.CharField(primary_key=True, max_length=11)
    kqstate = models.CharField(db_column='kqState', max_length=11, blank=True, null=True)  # Field name made lowercase.
    class_field = models.ForeignKey('TCourse', models.DO_NOTHING, db_column='class_id')  # Field renamed because it was a Python reserved word.
    stu = models.ForeignKey('TStudent', models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'chooseInfo'

