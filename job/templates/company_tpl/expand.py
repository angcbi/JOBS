#!/usr/bin/env python
# coding:utf-8
import os
import sys
"""
替换路径，运行时后面跟要处理的文件名
"""

def expand_static(filename):
    f = open(filename, 'r+')

    lines = f.readlines()
    f.seek(0)
    f.truncate()

    for line in lines:
        f.write(line.replace('href="css', 'href="/static/css').\
                 replace('src="js', 'src="/static/js').\
                 replace('src="images', 'src="/static/images')
                 )

    f.close()

def expand_url(filename):
    f = open(filename, 'r+')
    lines = f.readlines()
    f.seek(0)
    f.truncate()

    for line in lines:
        f.write(
            line.replace('zwlist.htm', '/joblist').\
            replace('d_salary.htm', '/')
        )

    f.close()

def expand_name(filename):
    f = open(filename, 'r+')
    lines = f.readlines()
    f.seek(0)
    f.truncate()

    for line in lines:
        f.write(
            line.replace('招聘猫', '招聘头条')
        )

    f.close()

if __name__ == '__main__':
    expand_name(sys.argv[1])
