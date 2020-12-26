var fs = require('fs');
var privateKey =fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');

var credentials = {key:privateKey, cert: certificate};
var cors = require('cors')
var app = require('express')();
var https = require('https').createServer({key:privateKey, cert: certificate},app);
// var http = require('http').createServer(app);
var io = require('socket.io')(https,{cors: {origin: ["https://nossasenhoradoteste.pt", "http://mfapp.bsb", "http://nossasenhoradoteste.bsb"],methods: ["GET", "POST"],credentials: true}});

// io.on('connection', (socket) => {
	// socket.on('phpstream', function(data){
			// var brod = data.page != null && data.page != undefined ? data.page+data.register : data.module;
		// socket.broadcast.emit(brod,data.ob);
	// });
// });
https.listen(3000, () => {
  console.log('listening on *:3000');
});

var test = io.on('connection', function(socket){
console.log("beep");
		
		 test.use((packet, next) => {
			 console.log("pacote");
			next();
		  });
		
		
       socket.on('presentes', function(data){
		   console.log("cheguei");
       		console.log(data);
            socket.broadcast.emit('presentes',data);
    	});
		socket.on('nowSpeaking', function(data){
		   console.log("falando");
       		console.log(data);
            socket.broadcast.emit('nowSpeaking',data);
    	});		
		socket.on('pontoativo', function(data){socket.broadcast.emit('pontoativo',data);});
		socket.on('forcereload', function(data){socket.broadcast.emit('forcereload',data);});
		socket.on('fecharjanelas', function(data){socket.broadcast.emit('fecharjanelas',data);});
		socket.on('pontodetalhe', function(data){socket.broadcast.emit('pontodetalhe',data);});
		socket.on('votar', function(data){socket.broadcast.emit('votar',data);});
})

// var port = process.env.PORT || 3000;

// app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
  // socket.on('chat message', function(msg){
    // io.emit('chat message', msg);
  // });
// });

// https.listen(port, function(){
  // console.log('listening on *:' + port);
// });

