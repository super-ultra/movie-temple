
let agents,
  targets,
  trailLength = 150;

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
}

function draw() {
  background(0, 50);

  for (let target of targets) {
    fill("#33dd9910");
    stroke("#33dd99");
    strokeWeight(1);
    ellipse(target.x, target.y, 50);
  }

  for (let agent of agents) {
    agent.move();
    agent.display();
  }
}

class Agent {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.targetIndex = floor(random(targets.length));
    this.trail = [];
  }

  move() {
    //pick a target point and get direction
    let target = targets[this.targetIndex];
    let direction = p5.Vector.sub(target, this.position);
    direction.normalize();
    direction.mult(3);
    this.position.add(direction);

    //update trail
    this.trail.push(this.position.copy());
    if (this.trail.length > trailLength) {
      this.trail.splice(0, 1);
    }

    //check distance to target
    let distance = p5.Vector.dist(this.position, target);
    if (distance < 25) {
      this.targetIndex = floor(random(targets.length));
    }

    //follow other agents trail
    for (let other of agents) {
      if (other !== this) {
        for (let i = 0; i < other.trail.length; i++) {
          let distance = p5.Vector.dist(this.position, other.trail[i]);
          if (distance < 80) {
            let direction = p5.Vector.sub(other.trail[i], this.position);
            direction.normalize();
            direction.mult(0.002);
            this.position.add(direction);
          }
        }
      }
    }

    //avoid other agents
    for (let other of agents) {
      if (other !== this) {
        let distance = p5.Vector.dist(this.position, other.position);
        if (distance < 30) {
          let away = p5.Vector.sub(this.position, other.position);
          away.normalize();
          away.mult(2.5);
          this.position.add(away);
        }
      }
    }
  }

  display() {
    noStroke();
    for (let i = 0; i < this.trail.length; i += 2) {
      fill("#33dd9910");
      circle(this.trail[i].x, this.trail[i].y, 3);
    }

    stroke(0, 5);
    fill("#33dd9930");
    circle(this.position.x, this.position.y, 25);
    fill("#33dd9950");
    circle(this.position.x, this.position.y, 15);
    fill("#33dd9990");
    circle(this.position.x, this.position.y, 5);
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  setup();
}
