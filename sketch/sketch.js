let agents;
let targets;
let rawGenres;
let genres;
const trailLength = 150;

function preload() {
  const url = "data/genres.json" 
  rawGenres = loadJSON(url);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  targets = [];
  for (let i = 0; i < 15; i++) {
    let target = createVector(random(width), random(height));
    targets.push(target);
  }

  agents = [];
  for (let i = 0; i < 50; i++) {
    let agent = new Agent(random(width), random(height));
    agents.push(agent);
  }
    
  genres = new Map();
  for (const [index, rawGenre] of Object.entries(rawGenres)) {
    const genre = new Genre(rawGenre["id"], rawGenre["color"], random(width), random(height));
    genres.set(genre.id, genre);
  }
}

function draw() {
  background(0, 50);

  for (const target of targets) {
    fill("#33dd9910");
    stroke("#33dd99");
    strokeWeight(1);
    ellipse(target.x, target.y, 50);
  }

  for (const agent of agents) {
    agent.move();
    agent.display();
  }
  
  for (const [id, genre] of genres.entries()) {
    genre.display();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
