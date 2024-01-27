let numSounds = 0
let lottie
let animData = []
let anim = []
let soundFiles = []
let soundEntered = []
let triggerX = []
let triggerY = []
let triggerSize = 100
let triggerAlpha = []


function add_sound(name, x, y) {
	soundFiles.push(loadSound('assets/' + name + '.mp3'))
	animData.push(loadJSON('assets/' + name + '.json'))
	triggerX.push(windowWidth * (x / 100))
	triggerY.push(windowHeight * (y / 100))
	numSounds++
}


function preload() {
	soundFormats('mp3')
	
	add_sound("strum", 25, 25)
	add_sound("wipe", 75, 25)
	add_sound("piano harmonic", 50, 50)
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	print(numSounds)
	
	for (let i = 0; i < numSounds; i++) { triggerAlpha[i] = 5 }
	for (let i = 0; i < numSounds; i++) { soundEntered[i] = false }

	for (let i = 0; i < numSounds; i++) {
		lottie = createDiv();
		let params = {
			container: lottie.elt,
			loop: false,
			autoplay: false,
			animationData: animData[i],
			renderer: 'svg',
		}
		anim[i] = bodymovin.loadAnimation(params);
		lottie.position(0, 0);
		lottie.size(windowWidth, windowHeight);

		anim[i].goToAndStop(1000)
	}

}

function draw() {
	background(40);
	noStroke()
	for (let i = 0; i < numSounds; i++) {
		if (triggerAlpha[i] > 5) triggerAlpha[i] -= 3
		fill(225, 225, 225, triggerAlpha[i])
		circle(triggerX[i], triggerY[i], triggerSize*2)
	}
}

function playSounds() {
	for (let i = 0; i < numSounds; i++) {
		if (dist(mouseX, mouseY, triggerX[i], triggerY[i]) < triggerSize) {
			anim[i].setSpeed(1)
			anim[i].goToAndStop(0)
			anim[i].play()
			if (soundEntered[i] == false) {
				soundFiles[i].playMode('restart')
				soundFiles[i].play()
				triggerAlpha[i] = 50
			}
			soundEntered[i] = true
		} else {
			soundEntered[i] = false
		}
	}
}

function mouseDragged() {
	playSounds()
}

function mouseReleased() {
	for (let i = 0; i < numSounds; i++) {
		soundEntered[i] = false
	}
}

function mousePressed() {
	if (getAudioContext().state == 'running') {
		playSounds()
	}
	userStartAudio()
}

function touchMoved() {
	return false
}

