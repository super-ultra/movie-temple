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
    
    const size = max(Guides.movieSize, this.movieCount * 8);
    
    fill(drawColor);
    circle(this.position.x, this.position.y, size);
    fill(drawColor);
    circle(this.position.x, this.position.y, size / 2);
    fill(drawColor);
    circle(this.position.x, this.position.y, size / 4);
  }
}
