#!/usr/bin/env python
# encoding: utf-8

from . import BaseModel
from .. import db

class JobModel(BaseModel):
    __tablename__ = 'jobs_hot'

    site_name = db.Column(db.String(32))
    job_name = db.Column(db.String(255))
    job_type = db.Column(db.INT, default=0)
    company_name = db.Column(db.String(255))
    company_id = db.Column(db.BIGINT)
    company_type = db.Column(db.String(255))
    job_city = db.Column(db.String(255))
    cuid = db.Column(db.BIGINT)                             # 城市编码
    education = db.Column(db.INT, default=0)
    education_str = db.Column(db.String(255))
    work_years_start = db.Column(db.INT, default=0)
    work_years_end = db.Column(db.INT, default=0)
    work_years_str = db.Column(db.String(255))
    salary_type = db.Column(db.INT, default=0)
    salary_start = db.Column(db.INT, default=0)
    salary_end = db.Column(db.INT, default=0)
    salary_str = db.Column(db.String(255))
    insurance_so = db.Column(db.INT, default=0)
    insurance_en = db.Column(db.INT, default=0)
    house_funds = db.Column(db.INT, default=0)
    bus_allowance = db.Column(db.INT, default=0)
    bonus = db.Column(db.INT, default=0)
    boon = db.Column(db.String(255))
    post_time = db.Column(db.BIGINT, default=0)
    post_url = db.Column(db.String(255))
    major_des = db.Column(db.TEXT)
    position_des = db.Column(db.TEXT)
    station_des = db.Column(db.TEXT)
    need_num = db.Column(db.INT, default=0)
    trade = db.Column(db.String(255))
    contact = db.Column(db.String(255))
    contact_email = db.Column(db.String(255))
    contact_phone = db.Column(db.String(255))
    add_time = db.Column(db.INT, default=0)
    scale = db.Column(db.INT, default=0)
    scale_str = db.Column(db.String(50))


class SpiderCompanyModel(BaseModel):
    __tablename__ = 'spider_company'
    company_type = db.Column(db.String(255))
    description = db.Column(db.TEXT)
    scale = db.Column(db.String(255))
    address = db.Column(db.String(255))
    site_url = db.Column(db.String(255))
    post_num = db.Column(db.String(20))


class UnbindCompanyModel(BaseModel):
    __tablename__ = 'unbind_company'

    company_id = db.Column(db.BIGINT, unique=True)
