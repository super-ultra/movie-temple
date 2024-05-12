class Field {
  
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    
    this.cols = canvasWidth / Guides.gridSize + 1;
    this.rows = canvasHeight / Guides.gridSize + 1;
  }
  
  draw() {
    this.drawCircles();
  }

  // Lines
  
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

  // Circles
  
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
          
          if (newValue > 0.2) {
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
          
          if (newValue > 0.2) {
            candidateValues.push(newValue);
            candidateColors.push(color(movie.mainColor));
          }
        }
        
        if (value >= 0.8) {
          noStroke();          
          fill(this._averageColor(candidateColors, candidateValues));
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

  _averageColor(colors, coeffs) {
    let sum = 0.0;
    let r = 0.0;
    let g = 0.0;
    let b = 0.0;       
    for (let k = 0; k < coeffs.length; k++) {
      sum += coeffs[k];
    
      r += colors[k].levels[0] * coeffs[k];
      g += colors[k].levels[1] * coeffs[k];
      b += colors[k].levels[2] * coeffs[k];
    }

    return color(r / sum, g / sum, b / sum, Guides.objectAlpha);
  }

};
