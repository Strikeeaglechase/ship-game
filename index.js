var express, app, server, io;

function onServerInit() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Server Started: ' + host + ':' + port);
}

function initServer(ip, port) {
	express = require('express');
	app = express();
	server = app.listen(port, ip, onServerInit);
	app.use(express.static('public'));
	io = require('socket.io')(server);
	initSocketIO();
}

function initSocketIO() {
	io.sockets.on('connection', function(socket) {
		console.log('New connection: ' + socket.id);
		socket.on('data', function(data) {
			socket.broadcast.emit('data', data);
		});
		socket.on('disconnect', function() {
			socket.broadcast.emit('dc', socket.id);
		});
	});
}

initServer('localhost', 8000);