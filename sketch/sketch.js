
let rawGenres;
let rawMovies;

let movies;
let targets;
let genres;

const trailLength = 150;

function preload() {
  rawGenres = loadJSON("data/genres.json");
  rawMovies = loadJSON("data/movie-history.json");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  targets = [];
  for (let i = 0; i < 15; i++) {
    let target = createVector(random(width), random(height));
    targets.push(target);
  }
    
  genres = new Map();
  for (const [index, rawGenre] of Object.entries(rawGenres)) {
    const genre = new Genre(rawGenre["id"], rawGenre["color"], 0, random(width), random(height));
    genres.set(genre.id, genre);
  }

  movies = [];
  for (const [index, rawMovie] of Object.entries(rawMovies)) {
    const movie = new Movie(rawMovie["title"], rawMovie["genres"], random(width), random(height));
    movies.push(movie)

    for (const genreId of rawMovie["genres"]) {
      genres.get(genreId).movieCount += 1;
    }
  }
}

function draw() {
  background(0, 50);

  for (const [id, genre] of genres.entries()) {
    genre.display();
  }

  // for (const target of targets) {
  //   fill("#33dd9910");
  //   stroke("#33dd99");
  //   strokeWeight(1);
  //   ellipse(target.x, target.y, 50);
  // }

  for (const movie of movies) {
    movie.move();
    movie.display();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
