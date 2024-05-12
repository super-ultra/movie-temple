let state;
let field; 

function preload() {
  state = new State();
  state.preload();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  state.setup();
  
  field = new Field();
}

function draw() {
  background(255, 150);

  for (const [id, genre] of state.genres.entries()) {
    genre.draw();
  }

  for (const movie of state.movies) {
    movie.move();
    movie.draw();
  }
  
  field.draw();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
