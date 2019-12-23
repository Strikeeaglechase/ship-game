const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine;
var keys = [];
var rects = [];
var lastFrameTime = Date.now();

function k(k) {
	return keys[k.toUpperCase().charCodeAt(0)];
}



function initNet() {
	socket = io.connect(getURL().substring(7, getURL().length - 1));
	socket.on('connect', function() {
		socket.on('data', data => game.handleNet(data));
	});
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	engine = Engine.create();
	rects.push({
		body: Bodies.rectangle(400, 200, 80, 80),
		w: 80,
		h: 80
	});
	rects.push({
		body: Bodies.rectangle(450, 50, 80, 80),
		w: 80,
		h: 80
	});
	rects.push({
		body: Bodies.rectangle(400, 610, 810, 60, {
			isStatic: true
		}),
		w: 810,
		h: 60
	});
	World.add(engine.world, rects.map(r => r.body));
}

function draw() {
	background(0);
	var dt = Date.now() - lastFrameTime;
	Engine.update(engine, dt);
	rects.forEach(r => {
		push();
		noStroke();
		fill(51);
		translate(r.body.position.x, r.body.position.y);
		rotate(r.body.angle);
		rect(0, 0, r.w, r.h);
		pop();
	});
	lastFrameTime = Date.now();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	keys[keyCode] = true;
}

function keyReleased() {
	keys[keyCode] = false;
}