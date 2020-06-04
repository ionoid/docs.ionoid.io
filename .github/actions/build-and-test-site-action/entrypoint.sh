#!/bin/sh -e

npm install
npm run build


echo "Start http server on port 12345"
busybox httpd -p 127.0.0.1:12345 -h .vuepress/dist 

linkchecker http://localhost:12345
