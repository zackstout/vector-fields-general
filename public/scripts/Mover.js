
export function Mover(x, y) {
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
    fill('steelblue');
    noStroke();
    ellipse(this.x, this.y, 7);
  };
}
