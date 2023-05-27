# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class TClass(models.Model):
    class_id = models.IntegerField()
    u_name = models.CharField(max_length=20)
    kq_time = models.DateTimeField(blank=True, null=True)
    student_num = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 't_class'


class TCourse(models.Model):
    c_id = models.AutoField(primary_key=True)
    c_name = models.CharField(max_length=15)
    tea = models.ForeignKey('TTea', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 't_course'


class TStudent(models.Model):
    stu_id = models.AutoField(primary_key=True)
    stu_name = models.CharField(max_length=15)
    class_name = models.CharField(max_length=15)
    college_name = models.CharField(max_length=15)
    face_url = models.CharField(max_length=100)
    openid = models.CharField(db_column='openID', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
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
        managed = False
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
