class Movie {

  constructor(title, genres, x, y) {
    this.title = title
    this.genres = genres
    this.position = createVector(x, y);
    this.targetGenreIndex = floor(random(genres.length));
    // this.trail = [];
  }
  
  get mainColor() {
    return state.genres.get(this.genres[0]).color;
  }
  
  get radius() {
    return Guides.movieRadius;
  }

  move() {
    // Pick a genre point and get direction
    const genre = this._getTargetGenre();
    const direction = p5.Vector.sub(genre.position, this.position);
    direction.normalize();
    direction.mult(Guides.movementSpeed);
    this.position.add(direction);

    // Update trail
    // this.trail.push(this.position.copy());
    // if (this.trail.length > trailLength) {
    //   this.trail.splice(0, 1);
    // }

    // Check distance to genre
    const distance = p5.Vector.dist(this.position, genre.position);
    if (distance < Guides.movieRadius + genre.radius) {
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
    for (const other of state.movies) {
      if (other !== this) {
        const distance = p5.Vector.dist(this.position, other.position);
        if (distance < Guides.movieRadius * 2 + 5) {
          const away = p5.Vector.sub(this.position, other.position);
          away.normalize();
          away.mult(2.5);
          this.position.add(away);
        }
      }
    }
  }

  draw() {
    noStroke();
    // for (let i = 0; i < this.trail.length; i += 2) {
    //   fill("#33dd9910");
    //   circle(this.trail[i].x, this.trail[i].y, 3);
    // }

    let diameter = Guides.movieRadius * 2;
    
    for (const genreId of this.genres) {
      const rawColor = state.genres.get(genreId).color;
      const drawColor = color(rawColor);
      drawColor.setAlpha(Guides.objectAlpha);
      
      fill(drawColor);
      circle(this.position.x, this.position.y, diameter);
      
      diameter = diameter / 1.5;
    }
    
    //const genre = this._getTargetGenre();
    //let drawColor = color(genre.color);
    //drawColor.setAlpha(128);
    //fill(drawColor);
    //circle(this.position.x, this.position.y, diameter);
    //circle(this.position.x, this.position.y, diameter / 2.5);
    //circle(this.position.x, this.position.y, diameter / 5);
  }

  
  // Private methods

  _getTargetGenre() {
    const genreId = this.genres[this.targetGenreIndex];
    return state.genres.get(genreId);
  }

}
