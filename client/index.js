import io from 'socket.io-client';

import redis from 'redis';

const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const socket = io('http://localhost:4000');

await redisClient.connect();

const socketId = 'D3JWhePdX6tjtZRqAAAN'; // replace with the actual socket ID

console.log("Console app started...");

const result = await redisClient.get(`socket:${socketId}`);
console.log(`Getting socket id from redis ${result}`);

socket.emit('private_message', { 
  message: `Hello specific client! at ${new Date()}`, recipient: socketId });

