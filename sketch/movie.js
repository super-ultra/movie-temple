class Movie {

  constructor(title, genres, x, y) {
    this.title = title
    this.genres = genres
    this.position = createVector(x, y);
    this.targetGenreIndex = floor(random(genres.length));
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

    // Check distance to genre
    const distance = p5.Vector.dist(this.position, genre.position);
    if (distance < Guides.movieRadius + genre.radius) {
      this.targetGenreIndex = floor(random(this.genres.length));
    }

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

    let diameter = Guides.movieRadius * 2;
    
    for (const genreId of this.genres) {
      const rawColor = state.genres.get(genreId).color;
      const drawColor = color(rawColor);
      drawColor.setAlpha(Guides.objectAlpha);
      
      fill(drawColor);
      circle(this.position.x, this.position.y, diameter);
      
      diameter = diameter / 1.5;
    }
  }

  
  // Private methods

  _getTargetGenre() {
    const genreId = this.genres[this.targetGenreIndex];
    return state.genres.get(genreId);
  }

}
