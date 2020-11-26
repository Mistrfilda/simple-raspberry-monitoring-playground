# Process manager

pm 2
```bash
npm install pm2@latest -g
yarn build
pm2 start dist/index.js --name express_api
pm2 list
pm2 stop express_api
pm2 restart express_api
```