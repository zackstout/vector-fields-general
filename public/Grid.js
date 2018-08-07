
export function Grid(n, s) {
  this.cells = [];

  this.create = function() {
    for (let i=0; i < numCells; i++) {
      for (let j=0; j < numCells; j++) {
        const cell = {
          x: i,
          y: j,
          noise: noise(i/noiseSense, j/noiseSense), // Should really be decoupled, moved to addVectors
        };
        this.cells.push(cell);
      }
    }
  };

  this.addVectors = function() {
    this.cells.forEach(c => {
      c.angle = c.noise * (2*PI);
    });
  };

  this.drawVectors = function() {
    this.cells.forEach(c => {
      const center = {
        x: c.x * cell_h,
        y: c.y * cell_w
      };
      // Draw the vector:
      push();
      translate(center.x, center.y);
      rotate(c.angle);
      strokeWeight(1.5);
      stroke(100);
      line(-vect_len, -vect_len, vect_len, vect_len);
      pop();
    });
  };

  this.create();
  this.addVectors();
} // end Grid
