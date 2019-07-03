#!/bin/sh

cd /Users/montage_fz/Desktop/个人git记录/learn_NodeJs/04.\ 原生搭建博客系统/src/logs
cp access.log $(date +%y-%m-%d).access.log
echo "" > access.log

