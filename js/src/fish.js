// // Create a Paper.js Path to draw a line into it:
// var path = new Path();
// // Give the stroke a color
// path.strokeColor = 'black';
// var start = new Point(100, 100);
// // Move to start and draw a line from there
// path.moveTo(start);
// // Note the plus operator on Point objects.
// // PaperScript does that for us, and much more!
// path.lineTo(start + [ 100, -50 ]);

// Code ported to Paper.js from http://the389.com/9/1/
// with permission.
var values = {
	friction: 0.8,
	timeStep: 0.01,
	amount: 15,
	mass: 2,
	count: 0
};
values.invMass = 1 / values.mass;

var path, springs;
var size = view.size * [1.2, 1];
var currentPoint = {
	x: Math.floor(size.width/2),
	y: Math.floor(size.height/2)
};
var frameCount = 0;
var frameModRate = 2;
var heightPadding = size.height/12;
var minHeight = heightPadding; 
var maxHeight = size.height - heightPadding;
var deltaRange = Math.floor(size.height/50);

var Spring = function(a, b, strength, restLength) {
	this.a = a;
	this.b = b;
	this.restLength = restLength || 80;
	this.strength = strength ? strength : 0.55;
	this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function() {
	var delta = this.b - this.a;
	var dist = delta.length;
	var normDistStrength = (dist - this.restLength) /
			(dist * this.mamb) * this.strength;
	delta.y *= normDistStrength * values.invMass * 0.2;
	if (!this.a.fixed)
		this.a.y += delta.y;
	if (!this.b.fixed)
		this.b.y -= delta.y;
};


function createPath(strength) {
	var path = new Path({
		fillColor: '#00b0c8',
		opacity: 0.5
	});
	springs = [];
	for (var i = 0; i <= values.amount; i++) {
		var segment = path.add(new Point(i / values.amount, 0.5) * size);
		var point = segment.point;
		if (i == 0 || i == values.amount)
			point.y += size.height;
		point.px = point.x;
		point.py = point.y;
		// The first two and last two points are fixed:
		point.fixed = i < 2 || i > values.amount - 2;
		if (i > 0) {
			var spring = new Spring(segment.previous.point, point, strength);
			springs.push(spring);
		}
	}
	path.position.x -= size.width / 4;
	return path;
}

function onResize() {
	if (path)
		path.remove();
	size = view.bounds.size * [2, 1];
	path = createPath(0.1);
}

// function onMouseMove(event) {
// 	console.log(event.point);
// 	var location = path.getNearestLocation(event.point);
// 	var segment = location.segment;
// 	var point = segment.point;

// 	if (!point.fixed && location.distance < size.height / 4) {
// 		var y = event.point.y;
// 		point.y += (y - point.y) / 6;
// 		if (segment.previous && !segment.previous.fixed) {
// 			var previous = segment.previous.point;
// 			previous.y += (y - previous.y) / 24;
// 		}
// 		if (segment.next && !segment.next.fixed) {
// 			var next = segment.next.point;
// 			next.y += (y - next.y) / 24;
// 		}
// 	}
// }

function movePoint() {
	//console.log(event.point);
	var location = path.getNearestLocation(currentPoint);
	var segment = location.segment;
	var point = segment.point;

	if (!point.fixed && location.distance < size.height / 4) {
		var y = currentPoint.y;
		point.y += (y - point.y) / 6;
		if (segment.previous && !segment.previous.fixed) {
			var previous = segment.previous.point;
			previous.y += (y - previous.y) / 24;

			if (previous.y > maxHeight) {
				previous.y = maxHeight - getRandomNum(0, deltaRange);
			}

			if (previous.y < minHeight) {
				previous.y = minHeight + getRandomNum(0, deltaRange);
			}
		}
		if (segment.next && !segment.next.fixed) {
			var next = segment.next.point;
			next.y += (y - next.y) / 24;

			if (next.y > maxHeight) {
				next.y = maxHeight - getRandomNum(0, deltaRange);
			}

			if (next.y < minHeight) {
				next.y = minHeight + getRandomNum(0, deltaRange);
			}
		}
	}
}

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function onFrame(event) {
	if (frameCount % frameModRate === 0) {
		var randomDelta = getRandomNum(-deltaRange, deltaRange);
		//console.log(randomDelta);
		var newX = (currentPoint.x + randomDelta);
		var newY = (currentPoint.y + randomDelta);

		currentPoint.x = (newX > size.width || newX < 0) ? 
						(currentPoint.x - randomDelta) : newX;//% (size.width/3);
		currentPoint.y = (newY > size.height || newY < 0) ? 
						(currentPoint.y - randomDelta) : newY;// % (size.height/3);
		movePoint();

		frameCount = 0;
	}

	frameCount++
	updateWave(path);
}

function updateWave(path) {
	var force = 1 - values.friction * values.timeStep * values.timeStep;
	for (var i = 0, l = path.segments.length; i < l; i++) {
		var point = path.segments[i].point;
		var dy = (point.y - point.py) * force;
		point.py = point.y;
		point.y = Math.max(point.y + dy, 0);
	}

	for (var j = 0, l = springs.length; j < l; j++) {
		springs[j].update();
	}
	path.smooth();
}

function onKeyDown(event) {
	if (event.key == 'space') {
		path.fullySelected = !path.fullySelected;
		path.fillColor = path.fullySelected ? null : 'black';
	}
}