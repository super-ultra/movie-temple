class Genre {
  constructor(id, color, movieCount, x, y) {
    this.id = id;
    this.color = color;
    this.movieCount = movieCount
    this.position = createVector(x, y);
  }

  get radius() {
    return max(Guides.movieRadius, this.movieCount * Guides.genreRadius);
  }
  
  draw() {
    noStroke();
    
    stroke(0, 5);

    let drawColor = color(this.color);
    drawColor.setAlpha(Guides.objectAlpha);
        
    const diameter = 2 * this.radius;

    fill(drawColor);
    circle(this.position.x, this.position.y, diameter);
    fill(drawColor);
    circle(this.position.x, this.position.y, diameter / 1.5);
    fill(drawColor);
    circle(this.position.x, this.position.y, diameter / 1.5 / 1.5);
    
    fill(40);
    textStyle(BOLD);
    text(this.id, this.position.x - 10, this.position.y);
  }
}
