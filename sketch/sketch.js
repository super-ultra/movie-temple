let state;

function preload() {
  state = new State();
  state.preload();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  state.setup();
}

function draw() {
  background(255, 150);

  for (const [id, genre] of state.genres.entries()) {
    genre.display();
  }

  for (const movie of state.movies) {
    movie.move();
    movie.display();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
