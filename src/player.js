class Player{
  // new movement system
  constructor(initialPos,  impulse, initialFriction, initialMaxVel, color){
    this.pos = initialPos ? initialPos : [200,200]
    this.vel = [0,0]
    this.acc = [0,0]
    this.impulse = impulse ? impulse : 1
    this.friction = initialFriction ? initialFriction : 0.1
    this.maxVel = initialMaxVel ? initialMaxVel : 10
    this.angle = 0
    this.color = color ? color : [0,0,0]
  }
  movement(){
    if(keyIsPressed){
      // impulse in the direction of the angle (mouse direction)
      this.acc = [
        this.impulse * cos(this.angle),
        this.impulse * sin(this.angle)
      ]
    }
    else{
      this.acc = [0,0]
    }
    
    if(normaVector(this.acc) > 0){
      // acceleration 
      this.vel = sumVector(this.vel,this.acc)
    }

    else{
      if(normaVector(this.vel) <= 0.05){
        // stop the player if vel is too low
        this.vel = [0,0]
      }
      if(this.vel != [0,0]){
        // apply friction when the player is moving
        // friction is in the opposite direction of the vel vector
        const friction = scalarProduct(unitVector(this.vel),this.friction)
        this.vel = subVector(
          this.vel,
          friction
          ) 
      }
    }
    if(normaVector(this.vel)>this.maxVel){
      // limit the max velocity
      this.vel=scalarProduct(unitVector(this.vel),this.maxVel)
    }

    // update the position
    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]
  }
  calcRotation(){
    // calculate the angle of the player relative to the mouse
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

  shoot(){
    // create a bullet
    console.log('shoot')
    return new Bullet(this.pos[0], this.pos[1], this.angle, [100,255,100])
  }
  
  

}