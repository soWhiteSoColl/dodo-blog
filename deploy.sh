#！ /bin/bash
cd /project/blog-web

git pull

cnpm install

npm run build

pm2 startOrRestart ./ecosystem.config.js