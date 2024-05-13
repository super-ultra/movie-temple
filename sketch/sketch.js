let state;
let field; 
let controlPanel;

function preload() {
  state = new State();
  state.preload();
  
  controlPanel = new ControlPanel();
}

function setup() {
  createCanvas(window.innerWidth - 4, window.innerHeight - 4);
  state.setup();
  
  field = new Field(window.innerWidth - 4, window.innerHeight - 4);
}

function draw() {
  background(255, 40);
  
  field.draw();
  
  for (const [id, genre] of state.genres.entries()) {
    genre.draw();
  }
  
  for (const movie of state.movies) {
    movie.move();
    movie.draw();
  }
  
  controlPanel.draw()
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
