# Express - Socket - Redis
A quick demo to show working app with socket and redis shared client.

# Setup
CD into server and run

```
yarn dev OR npm run dev
```

CD into client and run

```
yarn dev OR npm run dev
```

# Steps to test
- Copy the socket id from the server log
- Paste the socket id in client/index.js

```const socketId = 'bXuK4DnfiBq8N3IBAAAL';```

The mesage will be communicated from the node.js client to the server and to the browser as well.

