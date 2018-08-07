
// import Grid from './Grid.js';
let w, h, den, numCells, noiseSense, grid, cell_h, cell_w, vect_len, speed;
let movers = [];

function setup() {
  // Would like to change to size of window:
  w = 800;
  h = 800;
  den = 5;
  vect_len = 7;
  speed = 5;
  numCells = w * den / 100;
  noiseSense = 10; // Make this lower to increase variation in noise
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
  background(200);
  grid.drawVectors();
  movers.forEach(m => {
    m.changePosition();
    m.draw();
  });
}

function mouseClicked() {
  const mover = new Mover(mouseX, mouseY);
  movers.push(mover);
}

function mouseDragged() {
  const mover = new Mover(mouseX, mouseY);
  movers.push(mover);
}

// ==================================================================================================

function Grid(n, s) {
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

// ==================================================================================================

function Mover(x, y) {
  this.x = x;
  this.y = y;

  this.getCell = function() {
    const x = ceil(this.x / cell_w);
    const y = ceil(this.y / cell_h);
    let cell;
    for (let i=0; i < grid.cells.length; i++) {
      if (grid.cells[i].x == x && grid.cells[i].y == y) {
        cell = grid.cells[i];
        break;
      }
    }
    return cell;
  };

  this.getVelocity = function() {
    let angle;
    if (this.getCell()) {
      angle = this.getCell().angle;
    } else {
      // Just ignore them if they go off the grid:
      return {x: 0, y: 0};
    }
    return {
      // Why the heck does this PI/4 need to be here?
      x: cos(PI/4 + angle),
      y: sin(PI/4 + angle)
    };
  };

  this.changePosition = function() {
    const vel = this.getVelocity();
    this.x += vel.x * speed;
    this.y += vel.y * speed;

  };

  this.draw = function() {
    noFill();
    ellipse(this.x, this.y, 7);
  };
}
