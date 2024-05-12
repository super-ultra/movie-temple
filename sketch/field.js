class Field {
  
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    
    this.cols = canvasWidth / Guides.gridSize + 1;
    this.rows = canvasHeight / Guides.gridSize + 1;
  }
  
  draw() {
   
    // Lines
    //for (const movie of state.movies) {
    //  for (const other of state.movies) {
    //    if (other === movie) {
    //      continue;
    //    }
    //    const distance = p5.Vector.dist(movie.position, other.position);
    //    if (distance < 95) {
    //      strokeWeight(0.5);
    //      stroke(200, 200, 200, 50);
          
    //      line(movie.position.x, movie.position.y, other.position.x, other.position.y);
    //    }
    //  }
    //}
    
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const gridX = i * Guides.gridSize;
        const gridY = j * Guides.gridSize;
        
        let value = 0;
        let candidateColor;
        let candidateValue = 0;
        
        for (const [id, genre] of state.genres.entries()) {
          const r = genre.radius;
          const x = genre.position.x;
          const y = genre.position.y;
          const newValue = r * r / ((gridX - x) * (gridX - x) + (gridY - y) * (gridY - y));
          value += newValue;
          
          if (newValue > candidateValue) {
            candidateValue = newValue;
            candidateColor = color(genre.color);
          }
        }
      
        for (const movie of state.movies) {
          const r = movie.radius;
          const x = movie.position.x;
          const y = movie.position.y;
          const newValue = r * r / ((gridX - x) * (gridX - x) + (gridY - y) * (gridY - y));
          value += newValue;
          
          if (newValue > candidateValue) {
            candidateValue = newValue;
            candidateColor = color(movie.mainColor);
          }
        }
        
        if (value >= 0.8) {
          noStroke();
          candidateColor.setAlpha(candidateValue * 20);
          fill(candidateColor);
          ellipse(gridX, gridY, Guides.gridSize, Guides.gridSize);
        }
      
      
      }
    }
  }
  
};
