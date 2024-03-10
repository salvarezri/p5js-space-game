let backgroundStars

class backgroundMenu{
    setup() {
        createCanvas(400, 400);
        
        // Crear botones para el menú
        let startButton = createButton('Start Game');
        startButton.position(20, 20);
        startButton.mousePressed(startGame);
        
        let optionsButton = createButton('Options');
        optionsButton.position(20, 50);
        optionsButton.mousePressed(showOptions);
      }
      
    draw() {
        backgroundStars.draw();
      }
      
    startGame() {
        return true
      }
      
    showOptions() {
        // Lógica para mostrar opciones de juego
      }
}