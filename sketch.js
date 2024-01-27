let numSounds = 0
let lottie
let animData = []
let anim = []
let soundFiles = []
let soundEntered = []
let triggerX = []
let triggerY = []
let triggerSize
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
	
	for (let i = 0; i < numSounds; i++) { triggerAlpha[i] = 5 }
	for (let i = 0; i < numSounds; i++) { soundEntered[i] = false }
	triggerSize = windowWidth / 8

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
	fill(255)
	text("2", 20, 20)
}

function playSounds() {
	for (let i = 0; i < numSounds; i++) {
		if (dist(mouseX, mouseY, triggerX[i], triggerY[i]) < triggerSize) {
			if (soundEntered[i] == false) {
				triggerAlpha[i] = 50
				anim[i].setSpeed(1)
				anim[i].goToAndStop(0)
				anim[i].play()
				soundFiles[i].playMode('restart')
				soundFiles[i].play()
			}
			soundEntered[i] = true
		} else {
			soundEntered[i] = false
		}
	}
}

function touchMoved() {
	playSounds()
}

function touchEnded() {
	for (let i = 0; i < numSounds; i++) {
		soundEntered[i] = false
	}
}

function touchStarted() {
	if (getAudioContext().state == 'running') {
		playSounds()
	}
	userStartAudio()
}

function touchMoved() {
	playSounds()
	return false
}

