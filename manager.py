#!/usr/bin/env python
# encoding: utf-8

import os

from flask_script import Manager, prompt_bool, Shell
from flask_migrate import Migrate, MigrateCommand

from job import create_app, db


app = create_app(os.getenv('APP_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_context():
    return dict(app=app, db=db)

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

@manager.command
def deploy():
    """Deploy APP"""
    if prompt_bool('Are you sure deploy your APP?'):
        from flask_migrate import upgrade
        upgrade()

@manager.command
def maps():
    from urllib import unquote
    output = []
    for rule in app.url_map.iter_rules():
        # url = url_for(rule.endpoint, **options)
        url = str(rule)
        methods = ', '.join(rule.methods)
        line = unquote('{:50s} {:20s} {}'.format(
            rule.endpoint, methods, url
        ))
        output.append(line)

    for item in output:
        print item


@app.route('/home/<int:id>/<string:post>')
def get_user_post(id, post):
    return '11'


if __name__ == '__main__':
    manager.run()
