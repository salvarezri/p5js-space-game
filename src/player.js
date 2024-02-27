class Player{
  // new movement system
  constructor(laserSound, impulseSound, explotionSound, initialPos, impulse, initialFriction, initialMaxVel, color){
    console.log(laserSound, impulseSound, explotionSound)
    this.pos = initialPos ? initialPos : [200,200]
    this.vel = [0,0]
    this.acc = [0,0]
    this.impulse = impulse ? impulse : 1
    this.friction = initialFriction ? initialFriction : 0.1
    this.maxVel = initialMaxVel ? initialMaxVel : 10
    this.angle = 0
    this.color = color ? color : [0,0,0]
    this.isAccelerating = false
    this.laserSound = laserSound
    this.laserSound.setVolume(0.35)
    this.impulseSound = impulseSound
    this.impulseSound.setVolume(0.2)
    this.explotionSound = explotionSound
  }
  movement(){
    if(keyIsPressed){
      // impulse in the direction of the angle (mouse direction)
      this.isAccelerating = true
      this.acc = [
        this.impulse * cos(this.angle),
        this.impulse * sin(this.angle)
      ]
      this.impulseSound.play()
    }
    else{
      this.isAccelerating = false
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
    circle(this.pos[0],this.pos[1],20);
    strokeWeight(4);
    line(
      this.pos[0],
      this.pos[1],
      this.pos[0] + 30 * cos(this.angle),
      this.pos[1] + 30 * sin(this.angle)
      )
  }
  shoot(){
    // create a bullet
    this.laserSound.play()
    return new Bullet(this.pos[0], this.pos[1], this.angle, [100,255,100], this.explotionSound)
  }

  angleForParticles(){
    return radToDeg(reverseAngleRad(this.angle))
  }
  getTail(){
    // return the tail of the player (where particle for acceleration will be created)
    return [
      this.pos[0] - 20 * cos(this.angle),
      this.pos[1] - 20 * sin(this.angle)
    ]
  }
}