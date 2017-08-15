#!/usr/bin/env python
# encoding: utf-8

from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail

from config import config


db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.lgin_view = 'auth.login'
login_manager.login_message = u'请登录后操作'

def create_app(config_name):
    app = Flask(__name__)
    print config[config_name]
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)
    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)

    return app
