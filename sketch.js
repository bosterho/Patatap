let numTriggers = 0
let animContainer
let lottie = []
let animData = []
let anim = []
let soundFiles = []
let triggerEntered = []
let triggerX = []
let triggerX_px = []
let triggerY = []
let triggerY_px = []
let triggerSize
let triggerAlpha = []
let counter = 0
let prev_touches
let cellSize = 25

let log = ""

function add_trigger(name, x, y) {
	lottie.push(createDiv())
	soundFiles.push(loadSound("assets/" + name + ".mp3"))
	animData.push(loadJSON("assets/" + name + ".lottie.json"))
	triggerX.push(x * cellSize)
	triggerY.push(y * cellSize)
	numTriggers++
}

function preload() {
	soundFormats("mp3")

	add_trigger("strum",         1, 1)
	add_trigger("wipe 2",        2, 1)
	add_trigger("wipe",          3, 1)
	add_trigger("piano harmonic",1, 2)
	add_trigger("strange hit",   2, 2)
	add_trigger("windup",        3, 2)
	add_trigger("pop",           1, 3)
	add_trigger("grid",          2, 3)
	add_trigger("grid 2",        3, 3)
}

function setup() {
	pixelDensity(1) 
	createCanvas(1080/2, 1920/2)

	for (let i = 0; i < numTriggers; i++) {
		triggerAlpha[i] = 5
	}
	for (let i = 0; i < numTriggers; i++) {
		triggerEntered[i] = []
	}

	animContainer = createDiv();

	for (let i = 0; i < numTriggers; i++) {
		let params = {
			container: lottie[i].elt,
			loop: false,
			autoplay: false,
			animationData: animData[i],
			renderer: "svg",
		}
		anim[i] = bodymovin.loadAnimation(params)
		
		
		anim[i].goToAndStop(2000) // to end
	}
	update_animation_sizes()
}

function draw() {
	background(40)
	noStroke()
	for (let i = 0; i < numTriggers; i++) {
		if (triggerAlpha[i] > 2) triggerAlpha[i] -= 3
		fill(225, 225, 225, triggerAlpha[i])
		circle(triggerX_px[i], triggerY_px[i], triggerSize * 2)
	}
	fill(255)
	text(log, 20, 20)
}

function touchStarted() {
	if (getAudioContext().state == "running") {
		for (let i = 0; i < numTriggers; i++) {
			if (
				dist(
					touches[touches.length - 1].x,
					touches[touches.length - 1].y,
					triggerX_px[i],
					triggerY_px[i]
				) < triggerSize
			) {
				playTrigger(i)
				triggerEntered[i][touches.length - 1] = true
			}
		}
	}
	userStartAudio()
}

function mousePressed() {
	if (getAudioContext().state == "running") {
		for (let i = 0; i < numTriggers; i++) {
			if (dist(mouseX, mouseY, triggerX_px[i], triggerY_px[i]) < triggerSize) {
				playTrigger(i)
				triggerEntered[i][0] = true
			}
		}
	}
	userStartAudio()
}

function touchMoved() {
	for (let i = 0; i < numTriggers; i++) {
		for (let t = 0; t < touches.length; t++) {
			if (
				dist(touches[t].x, touches[t].y, triggerX_px[i], triggerY_px[i]) < triggerSize
			) {
				if (!triggerEntered[i][t]) {
					playTrigger(i)
				}
				triggerEntered[i][t] = true
			} else {
				triggerEntered[i][t] = false
			}
		}
	}
	userStartAudio()

	return false
}

function mouseDragged(event) {
	for (let i = 0; i < numTriggers; i++) {
		if (dist(mouseX, mouseY, triggerX_px[i], triggerY_px[i]) < triggerSize) {
			if (!triggerEntered[i][0]) {
				playTrigger(i)
			}
			triggerEntered[i][0] = true
		} else {
			triggerEntered[i][0] = false
		}
	}
	userStartAudio()
}

function keyPressed() {
	// a
	if (keyCode == 65) {
		playTrigger(0)
	}

	// s
	if (keyCode == 83) {
		playTrigger(1)
	}

	// d
	if (keyCode == 68) {
		playTrigger(2)
	}

	// f
	if (keyCode == 70) {
		playTrigger(3)
	}

	userStartAudio()

}

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// 	update_animation_sizes()
// }


