const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { generateMessage } = require("./utils/messages");
const { generateLocation } = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New Websocket Connection...");

  socket.emit("message", generateMessage("Welcome"));
  socket.broadcast.emit("message", generateMessage("A new user has joined!"));

  socket.on("sendMessage", (message, callback) => {
    io.emit("message", generateMessage(message));
    callback("Delivered");
  });
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left!"));
  });
  socket.on("sendLocation", (location, callback) => {
    io.emit(
      "locationMessage",
      generateLocation(
        `https://google.com/maps?q=${location.latitude},${location.longitude}`
      )
    );
    callback();
  });
});

server.listen(port, () => {
  console.log(`Server is connected on port ${port}`);
});
