
let w, h, den, numCells, noiseSense, grid, cell_h, cell_w;

function setup() {
  // Change to size of window:
  w = 800;
  h = 800;
  den = 5;
  numCells = w * den / 100;
  noiseSense = 100;
  grid = new Grid(numCells, noiseSense);
  cell_w = w / numCells;
  cell_h = h / numCells;

  createCanvas(w, h);
  background(200);

  grid.addVectors();
  console.log(grid);
  grid.drawVectors();
}

function draw() {

}

function Grid(n, s) {
  this.cells = [];

  this.create = function() {
    for (let i=0; i < numCells; i++) {
      for (let j=0; j < numCells; j++) {
        const cell = {
          x: i,
          y: j,
          noise: noise(i/noiseSense, j/noiseSense),
        };
        this.cells.push(cell);
      }
    }
  };

  this.addVectors = function() {
    this.cells.forEach(c => {
      const angle = c.noise * (2*PI);
      c.vector = { // Or perhaps this is unneeded; we only need angle.
        x: cos(angle),
        y: sin(angle)
      };
      c.angle = angle; // Redundant
    });
  };

  this.drawVectors = function() {
    this.cells.forEach(c => {
      // console.log(c);
      const center = {
        x: c.x * cell_h,
        y: c.y * cell_w
      };
      // console.log(center);

      push();
      translate(center.x, center.y);
      rotate(c.angle);
      stroke(150);
      line(-10, -10, 10, 10);
      pop();


    });
  };

  this.create();

}
