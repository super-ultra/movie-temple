class Movie {

  constructor(title, genres, x, y) {
    this.title = title
    this.genres = genres
    this.position = createVector(x, y);
    this.targetGenreIndex = floor(random(genres.length));
    // this.trail = [];
  }

  move() {
    // Pick a genre point and get direction
    const genre = this._getTargetGenre();
    const direction = p5.Vector.sub(genre.position, this.position);
    direction.normalize();
    direction.mult(3);
    this.position.add(direction);

    // Update trail
    // this.trail.push(this.position.copy());
    // if (this.trail.length > trailLength) {
    //   this.trail.splice(0, 1);
    // }

    // Check distance to genre
    const distance = p5.Vector.dist(this.position, genre.position);
    if (distance < 25) {
      this.targetGenreIndex = floor(random(this.genres.length));
    }

    // Follow other movies trail
    // for (let other of movies) {
    //   if (other !== this) {
    //     for (let i = 0; i < other.trail.length; i++) {
    //       let distance = p5.Vector.dist(this.position, other.trail[i]);
    //       if (distance < 80) {
    //         let direction = p5.Vector.sub(other.trail[i], this.position);
    //         direction.normalize();
    //         direction.mult(0.002);
    //         this.position.add(direction);
    //       }
    //     }
    //   }
    // }

    // Avoid other movies
    for (const other of movies) {
      if (other !== this) {
        const distance = p5.Vector.dist(this.position, other.position);
        if (distance < 30) {
          const away = p5.Vector.sub(this.position, other.position);
          away.normalize();
          away.mult(2.5);
          this.position.add(away);
        }
      }
    }
  }

  display() {
    noStroke();
    // for (let i = 0; i < this.trail.length; i += 2) {
    //   fill("#33dd9910");
    //   circle(this.trail[i].x, this.trail[i].y, 3);
    // }

    const genre = this._getTargetGenre();
    let drawColor = color(genre.color);
    drawColor.setAlpha(128);

    stroke(0, 5);
    fill(drawColor);
    circle(this.position.x, this.position.y, 25);
    circle(this.position.x, this.position.y, 15);
    circle(this.position.x, this.position.y, 5);
  }

  
  // Private methods

  _getTargetGenre() {
    const genreId = this.genres[this.targetGenreIndex];
    return genres.get(genreId);
  }

}
