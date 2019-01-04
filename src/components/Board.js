import React, { Component } from 'react';
import Cell from './Cell';


export default class Board extends Component {
  constructor(props) {
    super(props);

    let items = new Array(props.width * props.height);
    for (var i = 0; i < items.length; i++) {
      items[i] = { index: i, alive: false }
    }

    this.state = { cells: items };

    this.updateCell = this.updateCell.bind(this);
    this.stillAlive = this.stillAlive.bind(this);
  }

  createKey(cell) {
    return 'c' + cell.index;
  }

  updateCell(index, newState) {
    this.setState(state => {
        let cells = state.cells;
        cells[index]['alive'] = newState;

        return { cells: cells }
      }
    );
  }

  stillAlive(cell) {
    let neighborsAlive = 0;
    neighbordAlive += cell.index
    
  }

  render() {
    console.log(this.props.generation);
    console.log(this.state.cells[0]);
    // i=y*W + x   y = i / W   x = i % W
    return (
      <div className="container">
      {this.state.cells.map((cell, index) =>
        <Cell key={this.createKey(cell)}
              data={this.stillAlive(cell)}
              updater={this.updateCell}
        />
      )}
      </div>
    );
  }
}
