#!/bin/bash

# abort on errors
set -e

# install
npm install

# build
npm run build

# navigate into the build output directory
cd .vuepress/dist

if [ ! -f CNAME ]; then
        # if you are deploying to a custom domain
        echo 'docs.ionoid.io' > CNAME
fi

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ionoid/docs-dev.ionoid.io.git master:gh-pages

cd -
