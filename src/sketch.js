let backgroundStars
let player
let playerBullets = []
let particles = []
let asteroids = []


let sfxMainMusic
let sfxExplotion1
let sfxExplotion2
let sfxExplotion3
let sfxImpulse1
let sfxImpulse2
let sfxLaser1
let shipImg;
let points = 0
let life = 5


  
function preload(){
  //load img
  shipImg = loadImage('resources/nave.png');

  // load main music

  sfxMainMusic = loadSound('../assets/sounds/music/main.mp3')
  sfxExplotion1 = loadSound('../assets/sounds/explotion/explotion1.mp3')
  sfxExplotion2 = loadSound('../assets/sounds/explotion/explotion2.mp3')
  sfxExplotion3 = loadSound('../assets/sounds/explotion/eructo.mp3')
  sfxImpulse1 = loadSound('../assets/sounds/impulse/impulse1.mp3')
  sfxImpulse2 = loadSound('../assets/sounds/impulse/impulse2.mp3')
  sfxLaser1 = loadSound('../assets/sounds/laser/laser1.mp3')

}

function setup() {
  sfxMainMusic.setVolume(0.4)
  sfxMainMusic.loop()
  frameRate(24)
  let cnv = createCanvas(400, 400)

  // let startButton = createButton('Start Game');
  // startButton.position(width/2, height/2);
  // startButton.mousePressed(ture);
  
  // let optionsButton = createButton('Controls');
  // optionsButton.position(width/2, height/1.5);
  // optionsButton.mousePressed(2);

  //if(startButton){
    cnv.mousePressed(handleMousePressed)
    cnv.mouseReleased(handleMouseReleased)
    backgroundStars = new BackgroundStars()
    player = new Player(shipImg,laserSound = sfxLaser1, impulseSound = sfxImpulse1, explotionSound = sfxExplotion1)
    initAsteroids(5)
  //}
  
  // to test the two different player movements change the next line to:
  // player = new Player2()
}
function draw() {
  player.edges()
    backgroundStars.draw()
    update()
    handleParticles()
   
    player.draw()
    playerCollision()
    handleAsteroid()
    moveAndDrawBullets()
  
}

function update() {
  player.update()
}

function handleAsteroid(){
  if (asteroids.length < 3){
    initAsteroids(5)
  }
  for (let i = asteroids.length - 1; i >= 0; i--) {
    if (asteroids[i].r < 5){
      asteroids.splice(i, 1);
    }else{
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }
  }
}

function handleParticles(){
  // player is accelerating
  if(player.isAccelerating){
    particles.push(particleImpulse(player.getTail(),player.angleForParticles(),60));
  }
  drawParticles()
}
function handleMousePressed(){
  if(player.isAlive() && player.canShoot()){
    playerBullets.push(player.shoot())
  }
}
function handleMouseReleased (){
  // particles.push(particleExplosion([mouseX,mouseY]));
}

function moveAndDrawBullets(){
  // move the bullets and remove the ones that are off boundaries
  // go through the array backwards to avoid skipping elements when the element is removed

  for (let i = playerBullets.length-1; i >= 0; i--){
    playerBullets[i].move()
    playerBullets[i].draw()
      if(playerBullets[i].isOffBoundaries(0,0,width,height)){
        playerBullets.splice(i,1)
      } else {
        for (let j = asteroids.length - 1; j >= 0; j--){
          if(playerBullets[i].checkCollision(asteroids[j])){
            points += asteroids[j].points()
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
            particles.push(particleExplosion([playerBullets[i].x,playerBullets[i].y]));
            asteroids.splice(j, 1);
            playerBullets.splice(i, 1);
            console.log('points', points)
            break;
          }
      }
    }
  }
}

function playerCollision (){
  if (player.onFreeTime > 0){
    return;
  }
  for (let j = asteroids.length - 1; j >= 0; j--){
    
    if(asteroids[j].checkCollision(player)){
      player.restartPosition();
      const newAsteroids = asteroids[j].breakup();
      asteroids = asteroids.concat(newAsteroids);
      particles.push(particleExplosion([asteroids[j].pos.x,asteroids[j].pos.y]));
      asteroids.splice(j, 1);
      player.death()
      life -= 1
      if(life == 0){
        gameOver()
        break;
      }
      
    }
    
  }
}
function initAsteroids(n){
  asteroids = []
  for (let i = 0; i < n; i++) {
    asteroids.push(new Asteroid(undefined, undefined, player));
  }
}
function gameOver() {
  alert('Game Over')
  initAsteroids(5)
  life = 5
  points = 0
}