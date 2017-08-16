#!/usr/bin/env python
# encoding: utf-8

from flask import render_template
from flask.views import MethodView

from . import candidate

# 关于我们
class AboutUsView(MethodView):

    def get(self):

        return render_template('candidate_tpl/about_us.html')


# 联系我们
class ContactUsView(MethodView):

    def get(self):

        return render_template('candidate_tpl/contact_us.html')


# 免责声明
class DisclaimerView(MethodView):

    def get(self):

        return render_template('candidate_tpl/disclaimer.html')


# 权利声明
class CopyRightView(MethodView):

    def get(self):

        return render_template('candidate_tpl/copyright.html')


# 隐私保护
class PrivacyView(MethodView):

    def get(self):

        return render_template('candidate_tpl/privacy.html')


# 服务
class ServiceView(MethodView):

    def get(self):

        return render_template('candidate_tpl/service.html')




urls = {
    '/about_us': (AboutUsView, ['GET', ]),
    '/contact_us': (ContactUsView, ['GET', ]),
    '/disclaimer': (DisclaimerView, ['GET', ]),
    '/copyright': (CopyRightView, ['GET', ]),
    '/privacy': (PrivacyView, ['GET', ]),
    '/service': (ServiceView, ['GET', ])
}


for url, items in urls.items():
    instance.add_url_rule(
        url,
        view_func=items[0].as_view(url[1:]),
        methods=items[1],
    )
