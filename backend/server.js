const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes and models
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB().then(() => {
  // Clean up any stale unique indexes in MongoDB left over from schema changes
  User.syncIndexes().catch(console.error);
});

// Middleware
app.use(cors());
app.use(express.json());

// REST API Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Socket.io Setup
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const activeUsers = new Map(); // Tracks socket.id -> user object


io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('userJoined', (user) => {
    activeUsers.set(socket.id, user);
    io.emit('activeUsers', Array.from(activeUsers.values()));
  });


  socket.on('sendMessage', async (messageData) => {
    try {
      // Save to database
      const newMessage = await Message.create({
        sender: messageData.userId,
        content: messageData.content
      });

      // Populate sender info so the frontend knows who sent it
      const populatedMessage = await newMessage.populate('sender', 'username');

      // Broadcast to everyone
      io.emit('receiveMessage', populatedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on('disconnect', () => {
    activeUsers.delete(socket.id);
    io.emit('activeUsers', Array.from(activeUsers.values()));
    console.log(`User Disconnected: ${socket.id}`);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
