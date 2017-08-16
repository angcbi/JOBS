from datetime import datetime

from .. import db


# 用户模型超类，定义id, create_time, update_time
class BaseModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    create_time = db.Column(db.DateTime, default=datetime.utcnow)
    update_time = db.Column(db.DateTime, default=datetime.utcnow)

    @classmethod
    def get_or_create(cls, **kwargs):
        obj = cls.query.get(kwargs['id'])
        if obj is None:
            kwargs.setdefault('update_time', datetime.utcnow())
            obj = cls(**kwargs)
            db.session.add(obj)
            db.session.commit()

        return obj


