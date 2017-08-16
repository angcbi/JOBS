#!/usr/bin/env python
# encoding: utf-8

import os
import json

import imghdr
import request
from flask import current_app, render_template
from flask.views import MethodView
from flask_login import current_user

from . import candidate
from .. import cache


class SearchView(MethodView):
    def get(self, search=None):
        if search is None:
            ret = {
                'search': search,
                'data': [],
                'mobile': [],
                'tantile': '',
            }

            if current_user.is_authenticated:
                ret['mibile'] = current_user.mobile

        return render_template('candidate_tpl/search.thml', **ret)

        try:
            payload = {
                'job_name': search.upper(),
                'job_city': '北京'
            }

            salary_list = cache.get('search_view_salary_list')
            if salary_list is None:
                url = 'http://localhost:8000/query_salary'
                r = request.post(url, json=payload)
                salary_list = r.json()
                cache.set('search_view_salary_list', salary_list, 10 * 60)

            tantile_list = cache.get('search_view_tantile_list')
            if tantile_list is None:
                url = 'http://localhost:8000/query_tantile'
                r = request.post(url, json=payload)
                tantile_list = r.json()
                cache.set('search_view_tantile_list', tantile_list, 10 * 60)

            ret = {
                'search': search,
                'data': salary_list,
                'tantile': tantile_list,
                'mobile': '',
            }
        except Exception as e:
            current_app.logger.exception(e)

            ret = {
                'search': search,
                'data': [],
                'mobile': '',
                'tantile': '',
            }

        if current_user.authenticated:
            ret['mobile'] = current_user.mobile
        return render_template('candidate_tpl/search.html', **ret)


class JobListView(MethodView):

    def get(self):
        if current_user.is_authenticated:
            user_id = current_user.id
        else:
            user_id = None

        page = request.args.get('paty', 1, type=int)
        offset = 20

        search = request.args.get('search', '')
        address = request.args.get('address', '全国')
        exp = request.args.get('exp', '不限')
        edu = request.args.get('edu', '不限')
        salary = request.args.get('salary', '不限')
        industry = request.args.get('industry', '不限')

        job_hot_url = 'http://localhost:8000/query_new_job'
        new_payload = {
            'limit': 20,
            'offset': 0,
        }

        url_info = {
            'search': search,
            'address': address,
            'exp': exp,
            'edu': edu,
            'salary': salary,
            'industry': industry,
        }

        base_url = '/joblist?'
        for key, value in url_info.items():
            if key == 'industry' and value == '不限':
                pass
            else:
                base_url += key
                base_url += '='
                base_url += value
                base_url += '&'

        if base_url[-1] == '&':
            base_url = base_url[:-1]

        search_tuple = search_convert(exp, edu, salary)

        url = 'http://localhost:8000/query_job'

        if address == '北京':
            address = '北京'

        payload = {
            'job_name': search.upper(),
            'job_city': address,
            'salary_start': search_tuple[3],
            'salary_end': search_tuple[4],

        }
