const express = require("express")
const app = express()
const path = require("path")
const http = require("http")
const {Server} = require("socket.io")
const port = process.env.PORT || 3000

const expressServer = http.createServer(app)

const io = new Server(expressServer)

io.on("connection",(socket)=>{

    socket.join("kitchen-room")
    let size= io.sockets.adapter.rooms.get("kitchen-room").size
    io.sockets.in("kitchen-room").emit("cooking","fried rice is cooking "+size)
    io.sockets.in("kitchen-room").emit("boiling","Boiling water "+size)

    socket.join("bed-room")
    io.sockets.in("bed-room").emit("fan","fan is rotating")
    io.sockets.in("bed-room").emit("rest","I am taking rest")
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

expressServer.listen(port,()=>{
    console.log("running");
})