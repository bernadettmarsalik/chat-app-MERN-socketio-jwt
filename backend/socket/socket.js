import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], //for the frontend
    methods: ["GET", "POST"],
  },
});

// get users socket id
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Is user online?
const userSocketMap = {};
// {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //sending event to all connected clients who is online

  // listening to events with socket.on
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //sending event to all connected clients who is online
  });
});
export { app, io, server };
