class Bullet{
    constructor(x, y, direction, color){
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.color = color ? color : [0,255,0];
        this.speed = 10;
        this.size = 5
        this.isAlive = true;
    }

    move(){
      this.x += this.speed * cos(this.direction);
      this.y += this.speed * sin(this.direction);
    }

    draw(){
      strokeWeight(this.size);
      stroke(this.color);
      point(this.x, this.y);
      strokeWeight(1);
      stroke(255);
    }

    checkCollision(){
      return false
    }
    
    isOffBoundaries(x1, y1, x2, y2){
      return this.x < x1 || this.x > x2 || this.y < y1 || this.y > y2
    }
}