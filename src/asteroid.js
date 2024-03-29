class Asteroid{
    constructor(pos, r) {
        if(pos){
          this.pos = pos.copy()
        } else{
          this.pos =createVector(random(width), random(height)) 
        }
        if(r){
          if(r < 15){
            this.r = 0
          } else{
            this.r = r * 0.5
          }
        } else{
          this.r = random(15, 50) 
        }
        this.vel = p5.Vector.random2D()
        //this.vel.mult(random(1, 3))
        this.total = floor(random(5, 15))
        this.offset = [];
        for (let i = 0; i < this.total; i++) {
          this.offset[i] = random(-this.r * 0.5, this.r * 0.5)
        }
      }
      
      getRadius(){
        return this.r + this.r*0.2
      }
      getPosition(){
        return this.pos
      }

      update() {
        this.pos.add(this.vel);
      }
    
      render() {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        //ellipse(0, 0, this.r * 2);
        beginShape();
        for (var i = 0; i < this.total; i++) {
        var angle = map(i, 0, this.total, 0, TWO_PI);
        var r = this.r + this.offset[i];
        var x = r * cos(angle);
        var y = r * sin(angle);
        vertex(x, y);
        }
        endShape(CLOSE);
        pop();
      }

      breakup() {
        var newA = [];
        newA[0] = new Asteroid(this.pos, this.r);
        newA[1] = new Asteroid(this.pos, this.r);
        return newA;
      }

      edges() {
        if (this.pos.x > width + this.r) {
          this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
          this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
          this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
          this.pos.y = height + this.r;
        }
     }
     checkCollision(player){
      const rad = player.getRadius()
      const pos = player.getPosition()
      if(dist(this.pos.x, this.pos.y, pos.x,pos.y) < rad+this.r){
        player.explotionSound.play();
        return true
      } 
      return false
    }
    points(){
      return floor(50/this.r)
    }
}