class Player{
  constructor(initialPos,  acc, initialFriction, initialMaxVel, color){
    // TODO: change 1 dim acc and vel physics to 2 dim physics
    this.pos = initialPos ? initialPos : [200,200]
    this.vel = 0
    this.acc = acc ? acc : 0.3
    this.friction = initialFriction ? initialFriction : 0.1
    this.maxVel = initialMaxVel ? initialMaxVel : 6
    this.angle = 0
    this.color = color ? color : [0,0,0]
  }
  movement(){
  
    if(keyIsPressed){
      this.acc = 0.3
    }
    else{
      this.acc = 0
    }
    
    if(this.acc > 0){
      this.vel += this.acc
    }
    else{
      if(this.vel <= 0.01 && this.vel >= -0.01){
        this.vel = 0
      }
      if(this.vel != 0){
        this.vel -= this.friction 
      }
    }
    if(this.vel>this.maxVel){
      this.vel=this.maxVel
    }
    
    this.pos[0] += this.vel* cos(this.angle)
    this.pos[1] += this.vel* sin(this.angle)
  }
  calcRotation(){
    let x = mouseX - this.pos[0];
    let y = mouseY - this.pos[1];
    this.angle = atan2(y, x);
  }
  
  update()
  { 
    this.calcRotation()
    this.movement()
  }

  draw(){
    stroke(255,255,255);
    fill(this.color);
    rect(this.pos[0],this.pos[1],25,25);
  }

}