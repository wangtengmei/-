# -*- coding: utf-8 -*-
# @Filename: 全国高校数据信息.py
# @Time    : 2019/7/19 12:31
# @Author  : LYT
"""
https://static-data.eol.cn/www/school/140/info.json
"""
import requests, re, xlwt, json, pymysql


def Get_html(url):
    try:
        headers = {
            'User-Agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3676.400 QQBrowser/10.4.34"
        }
        r = requests.get(url, headers=headers)  # 带请求参数params
        r.encoding = r.apparent_encoding
        print("请求服务成功!")
        # print(r.text)
        return r.text
    except:
        print("请求失败")


def Get_info(url, id):
    url_api = "https://static-data.eol.cn/www/school/"  # 请求ajax api
    url = url_api + str(id) + "/info.json"
    basic_info = []  # 存高校基本信息

    # *******************************************#
    # ****************数据库配置******************#
    # *******************************************#
    # *******************************************##
    try:
        conn = pymysql.connect(
            host="localhost",  # mysql本机连接 或者写127.0.0.1也可以连接远程数据库
            user="root",  # 数据库用户名称
            passwd="root",  # 密码
            db="test",  # 连接的数据库名字
            port=3306  # 端口
        )
    except pymysql.Error as e:
        print("连接失败：%s" % e)
    cursor = conn.cursor()
    name = ""
    infoes = json.loads(Get_html(url))
    name = infoes['name']
    basic_info.append(infoes['name'])  # 学校名字
    level = ""  # 高校层次
    if infoes['f985'] == '1' and infoes['f211'] == '1':
        level += "985 211"  # 判断高校层次
    elif infoes['f211'] == '1':
        level += "211"
    else:
        level += infoes['level_name']
    basic_info.append(level)
    basic_info.append(infoes['type_name'])  # 高笑类型
    loacl = infoes['province_name'] + infoes['town_name']  # 高校地区
    basic_info.append(loacl)
    basic_info.append(infoes['phone'])  # 招生办电话
    basic_info.append(infoes['site'])  # 招生办官网
    print(basic_info)

    print("***********正在写入数据库%s高校基本信息数据**********" % name)
    sql = "insert into 全国高校基本信息(学校名称,高校层次,高校类型,高校地区,招生办电话,招生办官网)values(%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, (basic_info))
    conn.commit()  # 数据库数据提交
    conn.close()  # 关闭数据库连接
    print(name + "数据已经保存完毕!")


def main():
    # *******************************************#
    # ****************数据库配置******************#
    # *******************************************#
    # *******************************************##
    try:
        conn = pymysql.connect(
            host="localhost",  # mysql本机连接 或者写127.0.0.1也可以连接远程数据库
            user="root",  # 数据库用户名称
            passwd="root",  # 密码
            db="test",  # 连接的数据库名字
            port=3306  # 端口
        )
    except pymysql.Error as e:
        print("连接失败：%s" % e)
    cursor = conn.cursor()
    sql = """create table %s(
                      id int(20) not null primary key auto_increment,
                      学校名称 varchar(255),
                      高校层次 varchar(255),
                      高校类型 varchar(255),
                      高校地区 varchar(255),
                      招生办电话 varchar(255),
                      招生办官网 varchar (255))"""
    cursor.execute(sql % ("全国高校基本信息"))
    conn.commit()  # 数据库数据提交

    for id in range(30, 3000):
        try:
            url = "https://gkcx.eol.cn/school/" + str(id)
            print(url)
            Get_info(url, id)
        except:
            continue


if __name__ == '__main__':
    main()