#！ /bin/bash
cd /project/blog-web

git pull

yarn install

npm run build

pm2 restart blog-web