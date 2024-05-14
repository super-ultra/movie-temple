class Slider {
  constructor(title, x, y, min, max, value, step) {
    this.slider = createSlider(min, max, value, step);
    this.x = x;
    this.y = y;
    this.slider.position(x, y + 12);
    this.title = title
  }
  
  value() {
    return this.slider.value()
  }
  
  draw() {
    fill(0);
    stroke(200);
    textStyle(NORMAL);
    text(`${this.title} — ${this.value()}`, this.x + 1, this.y + 10);
  }   
}


class ControlPanel {
  constructor() {
    this.movieRadiusSlider = new Slider("Movie R", 10, 10, 1, 60, Guides.movieRadius, 1);
    this.genreRadiusSlider = new Slider("Genre R", 10, 10 + 1 * 40, 1, 60, Guides.genreRadius, 1);
    this.movementSpeedSlider = new Slider("Movement Speed", 10, 10 + 2 * 40, 1, 60, Guides.movementSpeed, 1);
    this.gridSizeSlider = new Slider("Grid Size", 10, 10 + 3 * 40, 1, 60, Guides.gridSize, 1);
    this.objectAlphaSlider = new Slider("Obj Alpha", 10, 10 + 4 * 40, 0, 255, Guides.objectAlpha, 1);
    this.fieldSizeSlider = new Slider("Field Size", 10, 10 + 5 * 40, 0.1, 3.0, Guides.fieldSize, 0.1);
    this.noiseFactorSlider = new Slider("Noise Factor", 10, 10 + 6 * 40, 0.1, 1000, Guides.noiseFactor, 0.1);
  }
  
  draw() {
    Guides.movieRadius = this.movieRadiusSlider.value();
    Guides.genreRadius = this.genreRadiusSlider.value();
    Guides.movementSpeed = this.movementSpeedSlider.value();
    Guides.gridSize = this.gridSizeSlider.value();
    Guides.objectAlpha = this.objectAlphaSlider.value();
    Guides.fieldSize = this.fieldSizeSlider.value();
    Guides.noiseFactor = this.noiseFactorSlider.value();
    
    this.movieRadiusSlider.draw();
    this.genreRadiusSlider.draw();
    this.movementSpeedSlider.draw();
    this.gridSizeSlider.draw();
    this.objectAlphaSlider.draw();
    this.fieldSizeSlider.draw();
    this.noiseFactorSlider.draw();
  }
}
