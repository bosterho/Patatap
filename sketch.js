let numSounds = 0;
let lottie;
let animData = [];
let anim = [];
let soundFiles = [];
let soundEntered = [];
let triggerX = [];
let triggerY = [];
let triggerSize;
let triggerAlpha = [];
let counter = 0;
let prev_touches;

let log = "";

function add_sound(name, x, y) {
  soundFiles.push(loadSound("assets/" + name + ".mp3"));
  animData.push(loadJSON("assets/" + name + ".json"));
  triggerX.push(windowWidth * (x / 100));
  triggerY.push(windowHeight * (y / 100));
  numSounds++;
}

function preload() {
  soundFormats("mp3");

  add_sound("strum", 25, 25);
  add_sound("wipe", 75, 25);
  add_sound("piano harmonic", 50, 50);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numSounds; i++) {
    triggerAlpha[i] = 5;
  }
  for (let i = 0; i < numSounds; i++) {
    soundEntered[i] = [];
  }
  triggerSize = windowWidth / 8;

  for (let i = 0; i < numSounds; i++) {
    lottie = createDiv();
    let params = {
      container: lottie.elt,
      loop: false,
      autoplay: false,
      animationData: animData[i],
      renderer: "svg",
    };
    anim[i] = bodymovin.loadAnimation(params);
    // lottie.position(0, 0);
    // lottie.size(1080, 1920);

    anim[i].goToAndStop(1000);
  }
}

function draw() {
  background(40);
  noStroke();
  for (let i = 0; i < numSounds; i++) {
    if (triggerAlpha[i] > 5) triggerAlpha[i] -= 3;
    fill(225, 225, 225, triggerAlpha[i]);
    circle(triggerX[i], triggerY[i], triggerSize * 2);
  }
  fill(255);
  text(log, 20, 20);
}

function touchStarted() {
  if (getAudioContext().state == "running") {
    for (let i = 0; i < numSounds; i++) {
      if (
        dist(
          touches[touches.length - 1].x,
          touches[touches.length - 1].y,
          triggerX[i],
          triggerY[i]
        ) < triggerSize
      ) {
        triggerSound(i);
        soundEntered[i][touches.length - 1] = true;
      }
    }
  }
  userStartAudio();
}

function mousePressed() {
  if (getAudioContext().state == "running") {
    for (let i = 0; i < numSounds; i++) {
      if (dist(mouseX, mouseY, triggerX[i], triggerY[i]) < triggerSize) {
        triggerSound(i);
        soundEntered[i][0] = true;
      }
    }
  }
  userStartAudio();
}

function touchMoved() {
  for (let i = 0; i < numSounds; i++) {
    for (let t = 0; t < touches.length; t++) {
      if (
        dist(touches[t].x, touches[t].y, triggerX[i], triggerY[i]) < triggerSize
      ) {
        if (!soundEntered[i][t]) {
          triggerSound(i);
        }
        soundEntered[i][t] = true;
      } else {
        soundEntered[i][t] = false;
      }
    }
  }
  return false;
}

function mouseDragged(event) {
  for (let i = 0; i < numSounds; i++) {
    if (dist(mouseX, mouseY, triggerX[i], triggerY[i]) < triggerSize) {
      if (!soundEntered[i][0]) {
        triggerSound(i);
      }
      soundEntered[i][0] = true;
    } else {
      soundEntered[i][0] = false;
    }
  }
}

function keyPressed() {
  // a
  if (keyCode == 65) {
    triggerSound(0);
  }

  // s
  if (keyCode == 83) {
    triggerSound(1);
  }

  // d
  if (keyCode == 68) {
    triggerSound(2);
  }

  // f
  if (keyCode == 70) {
    triggerSound(3);
  }
}
