# Process manager

pm 2
```bash
npm install pm2@latest -g
yarn build
pm2 start dist/index.js --name express_api
pm2 list
pm2 stop express_api
```


### Simple API deploy with git :D
```bash
cd /home/pi/node/simple-raspberry-monitoring-playground && git pull && cd api/ && yarn build && pm2 restart express_api
```