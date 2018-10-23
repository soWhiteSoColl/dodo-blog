#！ /bin/bash
git pull

npm run build

pm2 startOrReload ecosystem.config.js