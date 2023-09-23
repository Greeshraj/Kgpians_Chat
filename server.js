const express = require("express");
const path = require("path");
require('dotenv').config();

const { connectToMongoDB } = require("./config");
const { userRoutes, chatRoutes, messageRoutes } = require("./routes");
const { notFound, errorHandler } = require("./middleware");
const { default: mongoose } = require("mongoose");

const app = express(); 

app.use(express.json()); 

 
 

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => console.log("Failed to connect Database", err))

 


app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

 

 

app.use(notFound); 
app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  pingTimeout: 60 * 1000,
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat[0]; // Change it to object

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
