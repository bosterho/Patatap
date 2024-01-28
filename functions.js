function triggerSound(i) {
    triggerAlpha[i] = 50;
    anim[i].setSpeed(1);
    anim[i].goToAndStop(0);
    anim[i].play();
    soundFiles[i].playMode("restart");
    soundFiles[i].play();
}

function update_animation_sizes() {
    
    triggerSize = windowWidth / 8
    
    for (let i = 0; i < numTriggers; i++) {
        triggerX_px[i] = triggerX[i] / 100 * windowWidth
        triggerY_px[i] = triggerY[i] / 100 * windowHeight
    }
    
    let windowAspect = windowWidth / windowHeight
    let animationAspect = 1080 / 1920

    // this is not totally working
    if (windowAspect > animationAspect) {
        print("stretch horizontally")
        lottie.size(windowWidth)
        let y_offset = (lottie.size().height - 1920) / 2
        lottie.position(0, -y_offset)
    } else {
        print("stretch vertically")
        lottie.size(AUTO, windowHeight)
        let x_offset = (lottie.size().width - 1080) / 2
        lottie.position(-x_offset, 0)
    }
}