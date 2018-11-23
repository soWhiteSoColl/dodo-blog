#！ /bin/bash
cd /project/blog-web

git pull

npm run build

pm2 restart blog-web