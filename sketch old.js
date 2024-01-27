let sounds = []

function preload() {
	soundFormats('mp3')
	sounds[0] = new Sound(100, 100, 50, "kick", "simple loader")
	sounds[1] = new Sound(400, 50, 50, "kick", "simple loader")
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(220);
	for (let i = 0; i < sounds.length; i++) {
		sounds[i].draw()
	}
}

function mouseDragged() {
  for (let i = 0; i < sounds.length; i++) {
	if (dist(mouseX, mouseY, sounds[i].x, sounds[i].y) < sounds[i].radius) {
		sounds[i].play()
		[i]goToAndStop(map(pos,0,2000,0,12,true),true);

		if (sounds[i].entered == false) {
			sounds[i].file.play()
		}
		sounds[i].entered = true
	} else {
		sounds[i].entered = false
	}
  }
}