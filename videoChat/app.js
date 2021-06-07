const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.get('/',function(req,res){
    res.send('hello')
})


const PORT = process.env.PORT || 3300
server.listen(PORT,function(){
    console.log('server started on port ' + PORT)
})
