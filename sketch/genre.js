class Genre {
  constructor(id, color, movieCount, x, y) {
    this.id = id;
    this.color = color;
    this.movieCount = movieCount
    this.position = createVector(x, y);
  }

  get radius() {
    return max(Guides.movieRadius, this.movieCount * 4);
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
    circle(this.position.x, this.position.y, diameter / 2);
    fill(drawColor);
    circle(this.position.x, this.position.y, diameter / 4);
  }
}
