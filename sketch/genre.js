class Genre {
  constructor(id, color, x, y) {
    this.id = id;
    this.color = color;
    this.position = createVector(x, y);
  }
  
  display() {
    noStroke();
    
    stroke(0, 5);
    fill(this.color);
    circle(this.position.x, this.position.y, 25);
    fill(this.color);
    circle(this.position.x, this.position.y, 15);
    fill(this.color);
    circle(this.position.x, this.position.y, 5);
  }
}
