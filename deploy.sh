#！ /bin/bash
cd /project/dodo-blog

git pull

pm2 restart blog
