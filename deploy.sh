#！ /bin/bash
cd /project/dodo-blog

git checkout .

git pull

pm2 restart blog
