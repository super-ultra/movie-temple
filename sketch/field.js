class Field {
  
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    
    this.cols = canvasWidth / Guides.gridSize + 1;
    this.rows = canvasHeight / Guides.gridSize + 1;
  }
  
  draw() {
    this.drawLines();
  }
  
  drawCircles() {   
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const gridX = i * Guides.gridSize;
        const gridY = j * Guides.gridSize;
        
        let value = 0;
        let candidateValues = [];
        let candidateColors = [];
        
        for (const [id, genre] of state.genres.entries()) {
          const r = genre.radius;
          const x = genre.position.x;
          const y = genre.position.y;
          const newValue = r * r / ((gridX - x) * (gridX - x) + (gridY - y) * (gridY - y));
          value += newValue;
          
          if (newValue > 0.1) {
            candidateValues.push(newValue);
            candidateColors.push(color(genre.color));
          }
        }
      
        for (const movie of state.movies) {
          const r = movie.radius;
          const x = movie.position.x;
          const y = movie.position.y;
          const newValue = r * r / ((gridX - x) * (gridX - x) + (gridY - y) * (gridY - y));
          value += newValue;
          
          if (newValue > 0.1) {
            candidateValues.push(newValue);
            candidateColors.push(color(movie.mainColor));
          }
        }
        
        if (value >= 0.8) {
          let sum = 0.0;
          let r = 0.0;
          let g = 0.0;
          let b = 0.0;       
          for (let k = 0; k < candidateValues.length; k++) {
            sum += candidateValues[k];
          
            r += candidateColors[k].levels[0] * candidateValues[k];
            g += candidateColors[k].levels[1] * candidateValues[k];
            b += candidateColors[k].levels[2] * candidateValues[k];
            
          }
          
          noStroke();          
          fill(r / sum, g / sum, b / sum, Guides.objectAlpha);
          ellipse(
            gridX + 10 * sin(noise(0.00005 * gridX * frameCount)), 
            gridY + 10 * sin(noise(0.00005 * gridY * frameCount)), 
            Guides.gridSize + 4 * cos(noise(0.00005 * gridX * frameCount)), 
            Guides.gridSize + 4 * cos(noise(0.00005 * gridY * frameCount))
          );
        }
      }
    }
  }
  
  drawLines() {
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
