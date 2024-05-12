class Genre {
  constructor(id, color, movieCount, x, y) {
    this.id = id;
    this.color = color;
    this.movieCount = movieCount
    this.position = createVector(x, y);
  }
  
  display() {
    noStroke();
    
    stroke(0, 5);


    let drawColor = color(this.color);
    drawColor.setAlpha(128);
    
    fill(drawColor);
    circle(this.position.x, this.position.y, this.movieCount * 10);
    fill(drawColor);
    circle(this.position.x, this.position.y, this.movieCount * 5);
    fill(drawColor);
    circle(this.position.x, this.position.y, this.movieCount * 2);
  }
}
