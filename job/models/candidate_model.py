#!/usr/bin/env python
# encoding: utf-8

import uuid
from datetime import datetime

from flask import current_app
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound

from . import BaseModel
from .. import db


# Flask-Login需要模型实现is_active, get_id, is_authenticated, is_anonymous方法
# UserMixin类已经实现，可以继承该类, 也可以自己实现
class CandidateUserMode(BaseModel):
    __tablename__ = 'candidate_user'

    user_uuid = db.Column(db.String(50), unique=True)
    mobile = db.Column(db.String(15), unique=True)
    password = db.Column(db.String(50))
    confirmed = db.Column(db.Boolean, default=False)
    authenticated = db.Column(db.Boolean, default=False)

    @property
    def is_active(self):
        return self.confirmed

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return self.user_uuid

    @classmethod
    def login(cls, mobile, password):
        user = cls.query.filter_by(mobile=mobile).first()
        if user is not None:
            if user.verify_password(password):
                ret = {
                    'errmsg': 'login success',
                    'errcode': 0,
                    'user': user
                }
                return ret

    @classmethod
    def register(cls, mobile, password):
        try:
            user_uuid = str(uuid.uuid1())
            user = cls(mobile=mobile,
                       password=password,
                       user_uuid=user_uuid,
                       authenticated=True)
            db.session.add(user)
            db.session.commit()
            ret = {
                'errmsg': 'create success',
                'errcode': 0,
            }
            return ret
        except IntegrityError as e:
            current_app.logger.exception(e)
            db.session.rollback()
            ret = {
                'errmsg': 'user exist',
                'errcode': 1,
            }
        except Exception as e:
            current_app.logger.exception(e)
            db.sessioon.rollback()
            ret = {
                'errmsg': 'unknow error',
                'errcode': 5000,
            }
            return ret


class CandidateCVModel(BaseModel):
    __tablename__ = 'candidate_cv'

    user_id = db.Column(db.Integer, db.ForeignKey('CandidateUserModel.uuid'))
    user = db.relationship('CandidateUserModel', backref='cvs')
    candidate_cv = db.Column(db.Text)


class CandidateCollectionModel(BaseModel):
    __tablename__ = 'candidate_collection'
    __table_args__ = (
        db.UniqueConstraint('user_id', 'job_id', name='unq_user_job'),
    )

    user_id = db.Column(db.Integer, primary_key=True)
    user = db.relationship('CandidateUserModel')
    job_id = db.Column(db.Integer, db.ForeignKey('JobModel.id'))
    job = db.relationship('JobModel')
    status = db.Column(db.String(20), default='favorite', nullable=False) #favorite, delete


class CandidatePostModel(BaseModel):
    __tablename__ = 'candidate_post'
    __table_args__ = (
        db.UniqueConstraint('user_id', 'job_id', name='unq_user_job'),
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    job_id = db.Column(db.Integer)
    status = db.Column(db.String(20), default='post', nullable=False) # post, delete, viewed, apply deny
    create_time = db.Column(db.DateTime, default=datetime.utcnow)
    update_time = db.Column(db.DateTime, default=datetime.utcnow)


class CandidateSubScribeModel(BaseModel):
    __tablename__ = 'candidate_subscribe'

    user_id = db.Column(db.Integer, db.ForeignKey('CandidateUserModel.user_uuid'))
    search_str = db.Column(db.Text)
    status = db.Column(db.String(20), default='open', nullable=False) # open/close


