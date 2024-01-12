# Neko Proxy App

## How to run

1. Install the backend

```
cd neko-proxy-app
npm install
```

2. Install the frontend

```
cd frontend
npm install
npm run build
```

3. Start the backend service

```
cd neko-proxy-app
node main.js
```

Or

```
cd neko-proxy-app
node pm2start.js
```

4. Start browser and visit http://localhost:3334

## How to dev

1. Enable CORS for the backend

Go to the `config.json`, set 'enableCORS' true.

2. Install the backend

```
cd neko-proxy-app
npm install
```

3. Install the frontend

```
cd frontend
npm install
```

4. Go the the `frontend/src/utils/host.js`, set the 'host' 'http://localhost:3334'

5. Start backend service, recommand to use `nodemon` (should be installed globally in advance)

```
cd neko-proxy-app
npm i nodemon -g
nodemon
```

6. Start frontend live server

```
cd frontend
npm run dev
```

7. Press 'o' and 'enter' to start browser