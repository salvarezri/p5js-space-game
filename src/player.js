
class Player{
  // new movement system
  constructor(img,laserSound, impulseSound, explotionSound, initialPos, impulse, initialFriction, initialMaxVel, color){
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
    this.img = img;
    this.r = 25;
    this.isDeath = false;
    this.timecount = 0
    this.bulletTimeCount = 0
    this.ShootSpeed = 10
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
    if(this.isDeath){
      this.timecount++
      if(this.timecount > 70){
        this.revive()
      }
      return
    }
    this.calcRotation()
    this.movement()
    this.bulletTimeCount++
  }

  draw(){
    //new Image(naveimg,this.pos[0],this.pos[1],20,20);
    if(this.isDeath){
      return
    }
    push();
    translate(this.pos[0], this.pos[1]);
    rotate(this.angle+PI/2);
    if (this.img){
      imageMode(CENTER);
      image(this.img, 0, 0, this.r*2, this.r*2);  
    } else {
      circle(0, 0, 50);
      strokeWeight(4);
    line(
      this.pos[0],
      this.pos[1],
      this.pos[0] + 30 * cos(this.angle),
      this.pos[1] + 30 * sin(this.angle)
      )
    } 
    
    pop();
    
  }
  shoot(){
    // create a bullet
    this.laserSound.play()
    this.bulletTimeCount = 0
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
 //Funcion para movimiento eterno
  edges() {
    if (this.pos[0]> width + this.r) {
      this.pos[0] = -this.r;
    } else if (this.pos[0] < -this.r) {
      this.pos[0] = width + this.r;
    }
    if (this.pos[1] > height + this.r) {
      this.pos[1] = -this.r;
    } else if (this.pos[1] < -this.r) {
      this.pos[1] = height + this.r;
    }
 }
 getRadius(){
  return this.r
 }
 getPosition(){

  return {x:this.pos[0],
          y:this.pos[1]}
 }

  restartPosition(){
    // restart the position of the player
    this.acc = [0,0]
    this.vel = [0,0]
    this.isAccelerating = false
    
    this.pos =  [width/2,height/2]
    
  }
  isAlive(){
    return !this.isDeath
  }
  death(){
    this.isDeath = true
    this.timecount = 0
  }
  revive(){
    this.isDeath = false
  }
  canShoot(){
    return this.bulletTimeCount > this.ShootSpeed
  }

}
