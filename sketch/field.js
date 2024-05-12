class Field {
  
  draw() {
   
    for (const movie of state.movies) {
      for (const other of state.movies) {
        if (other === movie) {
          continue;
        }
        const distance = p5.Vector.dist(movie.position, other.position);
        if (distance < 95) {
          strokeWeight(0.5);
          stroke(200, 200, 200, 50);
          
          line(movie.position.x, movie.position.y, other.position.x, other.position.y);
        }
      }
    }
  }
  
};
