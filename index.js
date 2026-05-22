const express = require('express');
const path = require("path");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A user connected!");

    socket.on("message", (message) => {
        console.log("A user has sent a message:", message);
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000. Open http://localhost:3000 in your browser!');
});
