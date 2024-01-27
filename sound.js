class Sound {
    constructor(x, y, radius, file, animation) {
        this.x = x
        this.y = y
        this.radius = radius
        this.file = loadSound("assets/" + file + ".mp3")
        this.entered = false
        this.animation = animation
        this.playpos = 0
    }

    rotator(size, amount) {
        push()
        fill(100)
        translate(this.x, this.y)
        rotate(map(this.file.currentTime(), 0, this.file.duration(), 0, PI * amount))
        rect(-this.radius / 2 * size, -this.radius / 2 * size, this.radius * size, this.radius * size)
        pop()
    }

    draw() {
        if (this.animation == 0) {
            noStroke()
            fill(10)
            circle(this.x, this.y, this.radius*2 + this.file.currentTime())
            fill(100)
            this.rotator(0.8, 2)
            this.rotator(0.9, 0.5)
        }
        if (this.animation == 1) {
            noStroke()
            fill(150)
            circle(this.x, this.y, this.radius*2 + this.file.currentTime())
        }
        
    }
}
