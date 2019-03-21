class GlitchCanvas {

    constructor(
        className,
        imageSrc,
        width,
        height, 
        offset, 
        glitchIntervalMin, 
        glitchIntervalMax, 
        glitchDurationMin, 
        glitchDurationMax) {

        this.$canvas = document.createElement('canvas');
        this.context = this.$canvas.getContext('2d');

        this.$canvas.classList.add(className)
        document.body.appendChild(this.$canvas);

        this.$glitchSounds = document.querySelectorAll('.glitchSound')

        this.image = new Image()
        this.image.src = imageSrc
        this.image.onload = () => {
            this.init()
            window.onresize = this.init()
            this.draw()
        }

        this.width = width
        this.height = height
        this.offset = offset * this.width

        this.glitchInterval = {
            min: glitchIntervalMin, 
            max: glitchIntervalMax
        }

        this.glitchDuration = {
            min: glitchDurationMin,
            max: glitchDurationMax
        }
    }

    init() {
        
        clearInterval(this.glitchMaker)

        this.$canvas.width = this.width
        this.$canvas.height = this.height
        
        this.image.width = this.$canvas.width
        this.image.height = this.$canvas.height

        this.glitchMaker = setInterval(() => {
            
            // this.clear()
            
            this.draw()
            
            this.glitchImage()
            // setTimeout(this.glitchImage.bind(this), this.randomInterval(this.glitchInterval.min, this.glitchInterval.max))
            
        }, this.randomInterval(this.glitchInterval.min, this.glitchInterval.max))
    }

    draw() {

        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height)
    }

    clear() {

        this.context.clearRect(0, 0, this.width, this.height)
    }

    glitchImage() {

        // Generate random access to choose a random glitch sound
        this.randomAcces = Math.floor(Math.random() * this.$glitchSounds.length)

        // Play current glitch sound and init them
        this.$glitchSounds[this.randomAcces].play()
        this.$glitchSounds[this.randomAcces].currentTime = 0
        
        // Generate any part of glitch
        for (let i = 0; i < this.randomInterval(1, 13); i++) { // RandomInterval generate the number of cut on the image per frame
            
            this.x = Math.random() * this.width;
            this.y = Math.random() * this.height;
            this.spliceWidth = this.width - this.x;
            this.spliceHeight = this.randomInterval(5, this.height / 3);
            this.context.drawImage(this.$canvas, 0, this.y, this.spliceWidth, this.spliceHeight, this.x, this.y, this.spliceWidth, this.spliceHeight);
            this.context.drawImage(this.$canvas, this.spliceWidth, this.y, this.x, this.spliceHeight, 0, this.y, this.x, this.spliceHeight);
        }

        // Clear glitch
        setTimeout(() => {

            this.clear()
            this.init()
            this.draw()

        }, this.randomInterval(this.glitchDuration.min, this.glitchDuration.max)) // RandomInterval determine the glitch duration
    }

    randomInterval(a, b) {

        return ~~(Math.random() * (b - a) + a)
    }
}
