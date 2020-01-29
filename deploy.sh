#！ /bin/bash
cd /project/dodo-blog

git pull

cnpm install

npm run build

pm2 startOrRestart ./ecosystem.config.js

.next