#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd blog/.vuepress/dist

# 如果是发布到自定义域名
echo 'huteming.site' > CNAME

nowtime=`date +%Y-%m-%d:%H:%M:%S`

git init
git add -A
git commit -m "deploy at: $nowtime"

git push -f git@github.com:huteming/huteming.github.io.git master

cd -