function setup() {
  createCanvas(400, 400);
  player = new Player()
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