#!/usr/bin/env python
# encoding: utf-8

import os
import logging
from logging import handlers


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class Config(object):
    SECRET_KEY = os.getenv('SECRET_KEY') or 'JLI1N-!NL8V-(M0VB-$*Vs8'
    SQLALCHEM_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SUBJECT_PREFIX = '[焦博思]'
    MAIL_SENDER = '焦博思管理员<vip_susan@sina.cn>'
    JOBS_ADMIN = '1371998102@qq.com'
    LOG_FORMAT = logging.Formatter('%(asctime)s %(filename)s[line:%(lineno)d] - %(levelname)s %(message)s')

    CACHE_TYPE = 'redis'
    CACHE_DEFAULT_TIMEOUT = 60
    CACHE_REDIS_URL = 'redis://:@localhost:6379/1'

    @classmethod
    def init_app(cls, app):
       file_handler = logging.handlers.TimedRotatingFileHandler(
           filename=os.path.join(BASE_DIR, 'logs', 'jobs.log'),
           when='D',
           interval=2,
           backupCount=4
       )
       file_handler.setLevel(logging.WARN)
       file_handler.setFormatter(cls.LOG_FORMAT)
       app.logger.addHandler(file_handler)


class Development(Config):
    DEBUG = True
    MAIL_SERVER = 'smtp.sina.cn'
    MAIL_PORT = 25
    MAIL_USER_SLL = False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URI') or \
        'mysql://jobs:JOBS@)!&@localhost:3306/r'



class TestingConfig(Config):
    TESTING = True
    SQLALCHEM_DATABASE_URI = os.getenv('TEST_DATABASE_URI') or \
        'sqlite:////' + os.path.join(BASE_DIR, 'test-data.sqlite')


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI') or \
        'sqlite:////' + os.path.join(BASE_DIR, 'data.sqlite')
    LOG_FORMAT = logging.Formatter("""
            Message type:      %(levelname)s
            Location:          %(pathname)s:%(lineno)s
            Module:            %(module)s
            Function:          %(funcName)s
            Time:              %(asctime)s
            Message:           %(message)s""")

    @classmethod
    def init_app(cls, app):
        # 推荐采用super方式调用父类的类方法
        # Config.init_app(app)
        super(ProductionConfig, cls).init_app(app)

        credentials, secure = None, None

        if getattr(cls, 'MAIL_USERNAME', None) is not None:
            credentials = (cls.MAIL_USERNAME, cls.MAIL_PASSWORD)
            if getattr(cls, 'MAIL_USE_TLS', None) is not None:
                secure = ()

            mail_handler = handlers.SMTPHandler(
                mailhost=(cls.MAIL_SERVER, cls.MAIL_PORT),
                fromaddr=cls.MAIL_SENDER,
                toaddrs=[cls.JOBS_ADMIN],
                subject=cls.MAIL_SUBJECT_PREFIX + ' 应用告警',
                credentials=credentials,
                secure=secure
            )

            mail_handler.setFormat(cls.LOG_FORMAT)
            mail_handler.setLevel(logging.ERROR)
            app.logger.addHandler(mail_handler)


config = {
    'development': Development,
    'testing': TestingConfig,
    'production': ProductionConfig,

    'default': Development
}
