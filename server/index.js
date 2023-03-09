// const express = require('express');
import express from 'express';
const app = express();

//const http = require('http');
import http from 'http';

const server = http.createServer(app);


// const { Server } = require("socket.io");
import {Server} from 'socket.io';

// const path = require('path');
import path from 'path';

// const redis = require('redis');
import redis from 'redis';

const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});


const io = new Server(server);

await redisClient.connect();


app.get('/', (req, res) => {
  console.log(`Serving index.html ${path.resolve("./public/index.html")}`);
  res.sendFile(path.resolve("./public/index.html"));
});

io.on('connection', async (socket) => {
  console.log(`a user connected ${socket.id}`);
  redisClient.set(`socket:${socket.id}`, socket.id);

  const id = await redisClient.get(`socket:${socket.id}`);
  console.log(`Getting socket id from redis ${id}`);

  socket.on('disconnect', () => {
    // Remove the socket id from Redis on disconnection
    //redisClient.del(`socket:${socket.id}`);
  });

  // handle incoming messages from the server
  socket.on('private_message', (data) => {
    console.log('Received private message from server:', data);
    // Emit the message to the recipient
    io.to(data.recipient).emit('private_message', data);
    
  });

});

server.listen(4000, () => {
  console.log('listening on *:4000');
});