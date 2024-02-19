class BackgroundStars{
  constructor(n,maxSize, minSize, maxBrightness, minBrightness, spetialProportion){
    this.n = n ? n : 25
    this.maxSize = maxSize ? maxSize : 6
    this.minSize = minSize ? minSize : 1
    this.maxBrightness = maxBrightness ? maxBrightness : 255
    this.minBrightness = minBrightness ? minBrightness : 100
    this.spetialProportion = spetialProportion ? spetialProportion : 0.5
    this.stars = []
    this.setup()
  }
  draw(){
    // draw a black background
    background(0)
    // draw the stars
    for(let i = 0; i < this.stars.length; i+=1){
      // points with different sizes, brightness and positions
      // defined by the stars array.
      // some stars vhange their brightness over time randomly
      strokeWeight(this.stars[i][2])
      stroke(this.stars[i][4]== 1 ? Math.floor(randomGaussian(200,100)) : this.stars[i][3])
      point(this.stars[i][0],this.stars[i][1])
    }
    // reset the stroke
    strokeWeight(1)
    stroke(255)
  }
  setup(){
    // create the stars array defined by the constructor params
    for(let i = 0; i < this.n; i++){
      this.stars.push([
        Math.floor(random(0,width)),
        Math.floor(random(0,height)),
        Math.floor(random(this.minSize,this.maxSize)),
        Math.floor(random(this.minBrightness,this.maxBrightness)),
        random(0,1) > this.spetialProportion ? 1 : -1
      ])
    }
  }
}