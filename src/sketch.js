let pause = false
function setup() {
  frameRate(24)
  createCanvas(400, 400)
  // to test the two different player movements change the next line to:
  // player = new Player2()
  player = new Player2()
  BackgroundStars = new BackgroundStars()
}

function update() {
  player.update()
  
}
function draw() {
  update()
  BackgroundStars.draw()
  player.draw()
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}