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

function preload(){
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
    player = new Player(laserSound = sfxLaser1, impulseSound = sfxImpulse1, explotionSound = sfxExplotion1)
    for (let i = 0; i < 5; i++) {
      asteroids.push(new Asteroid());
    }
  //}
  
  // to test the two different player movements change the next line to:
  // player = new Player2()
  
  

}
function draw() {
  
    backgroundStars.draw()
    update()
    handleParticles()
    player.draw()
    handleAsteroid()
    moveAndDrawBullets()
  
}

function update() {
  player.update()
}

function handleAsteroid(){
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
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
  playerBullets.push(player.shoot())
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
    if(playerBullets[i].checkCollision()){
      particles.push(particleExplosion([playerBullets[i].x,playerBullets[i].y]));
      playerBullets.splice(i,1)
      continue
    }
    if(playerBullets[i].isOffBoundaries(0,0,width,height)){
      playerBullets.splice(i,1)
    }
  }

  // for (let i = playerBullets.length-1; i >= 0; i--){
  //   playerBullets[i].move()
  //   playerBullets[i].draw()
  //     if(playerBullets[i].isOffBoundaries(0,0,width,height)){
  //       playerBullets.splice(i,1)
  //     } else {
  //       for (let j = asteroids.length - 1; j >= 0; j--){
  //         if(playerBullets[i].checkCollision(asteroids[j])){
  //           if (asteroids[j].r > 10) {
  //             let newAsteroids = asteroids[j].breakup();
  //             asteroids = asteroids.concat(newAsteroids);
  //             //particles.push(particleExplosion([playerBullets[i].x,playerBullets[i].y]));
  //             //playerBullets.splice(i,1)
  //             //continue
  //           }
  //           asteroids.splice(j, 1);
  //           playerBullets.splice(i, 1);
  //           break;
  //         }
  //     }
  //   }
  // }
}