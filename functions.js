function triggerSound(i) {
    triggerAlpha[i] = 50;
    anim[i].setSpeed(1);
    anim[i].goToAndStop(0);
    anim[i].play();
    soundFiles[i].playMode("restart");
    soundFiles[i].play();
  }
  