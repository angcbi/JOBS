#!/usr/bin/env python
# encoding: utf-8

from flask import Blueprint

candidate = Blueprint('candidate_bp', __name__)


from . import candidate_view
