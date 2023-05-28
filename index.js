const express = require("express")
const app = express()
const path = require("path")
const http = require("http")
const {Server} = require("socket.io")
const port = process.env.PORT || 3000

const expressServer = http.createServer(app)

const io = new Server(expressServer)

io.on("connection",(socket)=>{
    socket.on("sendMessage",(msg)=>{
        io.emit("chat",(msg))
    })
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

expressServer.listen(port,()=>{
    console.log("running");
})