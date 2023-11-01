const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config() //This should always above the port.

app.use(express.json())
app.use(cors())

const connect = require('./db/connect')
const userRoute = require('./routes/user')

connect() //Connecting to Database

const PORT = process.env.DEV_PORT || 3001;

app.use(userRoute)

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    // console.log('New user connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});