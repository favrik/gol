import React, { Component } from 'react';
import Cell from './Cell';


export default class Board extends Component {
  width() {
    return 20;
  }

  height() {
    return 20;
  }

  createKey(coords) {
    return 'c' + coords.x + '-' + coords.y;
  }

  render() {
    let items = [];

    for (var i = 1; i < this.width(); i++) {
      for (var j = 1; j < this.height(); j++) {
        items.push({ x: i, y: j })
      }
    }

    return (
      <div className="container">
      {items.map((coords, index) =>
        <Cell key={this.createKey(coords)}
              x={coords.x}
              y={coords.y}
        />
      )}
      </div>
    );
  }
}
