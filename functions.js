function playTrigger(i) {
    // animContainer.elt.appendChild(lottie[i].elt);
    triggerAlpha[i] = 50;
    anim[i].setSpeed(1);
    anim[i].goToAndStop(0);
    anim[i].play();
    soundFiles[i].playMode("restart");
    soundFiles[i].play();
    
}

function update_animation_sizes() {
    
    triggerSize = width / 8
    
    for (let i = 0; i < numTriggers; i++) {
        triggerX_px[i] = triggerX[i] / 100 * width
        triggerY_px[i] = triggerY[i] / 100 * height
    }
    
    let windowAspect = width / height
    let animationAspect = 1080 / 1920
    
    for (let i = 0; i < numTriggers; i++) {
        lottie[i].position(0, 0)
        lottie[i].size(width, height)
    }

    // this is not totally working
    // for (let i = 0; i < numTriggers; i++) {
    //     if (windowAspect > animationAspect) {
    //         // print("stretch horizontally")
    //         lottie[i].size(windowWidth)
    //         let y_offset = (lottie[i].size().height - 1920) / 2
    //         lottie[i].position(0, -y_offset)
    //     } else {
    //         // print("stretch vertically")
    //         lottie[i].size(AUTO, windowHeight)
    //         let x_offset = (lottie[i].size().width - 1080) / 2
    //         lottie[i].position(-x_offset, 0)
    //     }
    // }
}