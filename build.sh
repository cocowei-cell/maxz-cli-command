#!/bin/bash/env
set -e
DIRNAME=$0
if [ "${DIRNAME:0:1}" = "/" ];then
    CURDIR=`dirname $DIRNAME`
else
    CURDIR="pwd"/"`dirname $DIRNAME`"
fi

cd $CURDIR

#Your Commande
# node $CURDIR/app.js
# pm2 start $CURDIR/app.js -n project_name   这里的project_name必须传递，远程服务器将根据该名字进行删除或者关闭操作