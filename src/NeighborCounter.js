export default class NeighborCounter {
  constructor(params) {
    this.width = parseInt(params.width, 10);
    this.height = parseInt(params.height, 10);
    this.cells = params.cells;
  }

  itsAlive(cell) {
    let neighborsAlive = this.neighborsAlive(cell);
    console.log(cell.index + '  neighbors: ' + neighborsAlive);

    if (cell.alive) {
      if (neighborsAlive > 3 || neighborsAlive < 2) {
        return false;
      }

      return true;
    }

    if (neighborsAlive === 3) {
      return true;
    }

    return false;
  }

  neighborsAlive(cell) {
    let neighborsAlive = 0;
    const positions = this.neighborPositions(cell)

    for (let cellIndex of positions) {
      let cell = this.cells[cellIndex];
      neighborsAlive += cell === undefined ? 0 : cell.alive; // coercion from boolean to int!!
    }

    return neighborsAlive;
  }

  neighborPositions(cell) {
    const cellIndex = cell.index

    return [
      this.leftCell(cellIndex), // left
      this.rightCell(cellIndex), // right
      cellIndex + this.width, // bottom
      this.leftCell(cellIndex + this.width), // bottomLeft
      this.rightCell(cellIndex + this.width), // bottomRight
      cellIndex - this.width, // top
      this.leftCell(cellIndex - this.width), // topLeft
      this.rightCell(cellIndex - this.width) // topRight
    ];
  }

  rightCell(cellIndex) {
    const rightEdgeCellIndex = this.width * this.row(cellIndex) - 1;

    return cellIndex === rightEdgeCellIndex ? -1 : cellIndex + 1;
  }

  leftCell(cellIndex) {
    const leftEdgeCellIndex = this.width * this.row(cellIndex) - this.width;

    return cellIndex === leftEdgeCellIndex ? -1 : cellIndex - 1;
  }

  row(cellIndex) {
    return Math.floor(cellIndex / this.width) + 1;
  }
}
