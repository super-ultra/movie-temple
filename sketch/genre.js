class Genre {
  constructor(id, color, movieCount, x, y) {
    this.id = id;
    this.color = color;
    this.movieCount = movieCount
    this.position = createVector(x, y);
  }

  size() {
    return max(Guides.movieSize, this.movieCount * 8);
  }
  
  draw() {
    noStroke();
    
    stroke(0, 5);

    let drawColor = color(this.color);
    drawColor.setAlpha(128);
        
    fill(drawColor);
    circle(this.position.x, this.position.y, this.size());
    fill(drawColor);
    circle(this.position.x, this.position.y, this.size() / 2);
    fill(drawColor);
    circle(this.position.x, this.position.y, this.size() / 4);
  }
}
