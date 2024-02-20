let backgroundStars
const player = new Player()
let playerBullets = []
let particles = []

function setup() {
  frameRate(24)
  let cnv = createCanvas(400, 400)
  cnv.mousePressed(handleMousePressed)
  cnv.mouseReleased(handleMouseReleased)
  // to test the two different player movements change the next line to:
  // player = new Player2()
  backgroundStars = new BackgroundStars()

}
function draw() {
  backgroundStars.draw()
  update()
  handleParticles()
  player.draw()
  moveAndDrawBullets()
}

function update() {
  player.update()
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
  particles.push(particleExplosion([mouseX,mouseY]));
}

function moveAndDrawBullets(){
  // move the bullets and remove the ones that are off boundaries
  // go through the array backwards to avoid skipping elements when the element is removed
  for (let i = playerBullets.length-1; i >= 0; i--){
    playerBullets[i].draw()
    playerBullets[i].move()
    if(playerBullets[i].isOffBoundaries(0,0,width,height)){
      playerBullets.splice(i,1)
    }
  }
}