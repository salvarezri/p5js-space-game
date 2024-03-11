let myFont;
let myText;
let button;
let val = 0;
let gameOverColor = 255;
let randomVal;

function preload() {
  myFont = loadFont('PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);
  
  myText = "GAME OVER!"
  
  button = createButton('RESTART');
  button.position(width /2 - 70, height/2 + 50);
  button.mousePressed(restartGame);
  button.style("background-color", "green")
  button.style("font-size", "1em")
  button.style("color", "white")
  button.style("font-family", "Press Start 2P", "cursive")
  button.style("padding", "5px")
  button.style("position", "absolute")
  
  console.log(button);
}

function restartGame() {
  console.log("* c reinicia");
}

function draw() {
  background(val);
  fill(gameOverColor);
  textFont(myFont);
  textSize(36);
  textAlign(CENTER);
  text(myText, width/2, height/2);
  randomVal = (random(0, 255));
  gameOverColor = (randomVal, 0, randomVal*10)
}
