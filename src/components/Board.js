// First important realization:
//
// CLONING
// Deep copying or cloning array of objects = by default they are passed by reference
// easy to clone primitive types, but not objects
// also the easiest workaround (JSON.parse JSON.stringify) won't work if the object
// contains functions, Infinity/undefinied  or other non Json parsable
//
// you can also use Object.assign, but might need to polyfill.
//
//
// Second important realization:
//
// Initially, Im creating a Cell object for every board location or coordinate,  this is
// completely the wrong thought model!! xD  Those should be either coordinate, or location, 
// definitely not a cell object.   The initial seeding process is what magically spawns a cell
// in a determined coordinate.
//
//
// Things I want to implement:
//
// * Infinite board, negative coordinates go to the edge of the board
// * Efficiency 1000 x 1000 board?
// * LifeList algo?    http://dotat.at/prog/life/life.html
// * Bonus UX points! (from Viget)
// http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/?autoplay=0&trail=0&grid=1&colors=1&zoom=1&s=%5B{%228%22:%5B60,61,98,103,109,115%5D},{%229%22:%5B60,61,77,78,97,99,102,104,108,110,114,116%5D},{%2210%22:%5B76,79,98,103,105,109,111,115,117%5D},{%2211%22:%5B76,79,104,110,112,116,118%5D},{%2212%22:%5B60,61,63,64,77,78,111,117%5D},{%2213%22:%5B60,61,63,64%5D},{%2219%22:%5B76,77,79,97,98,102,103,108,109,114,115%5D},{%2220%22:%5B76,78,79,97,99,102,104,108,110,114,116%5D},{%2221%22:%5B98,103,105,109,111,115,117%5D},{%2222%22:%5B104,110,112,116,118%5D},{%2223%22:%5B61,111,117%5D},{%2224%22:%5B60,62,76,77%5D},{%2225%22:%5B60,62,75,78%5D},{%2226%22:%5B61,76,79%5D},{%2227%22:%5B77,78,96,97,102,103,109,110,115,116%5D},{%2228%22:%5B96,98,102,104,109,111,115,117%5D},{%2229%22:%5B61,65,97,98,103,105,110,112,116,118%5D},{%2230%22:%5B60,62,64,66,104,105,111,113,117,119%5D},{%2231%22:%5B60,62,64,66,75,76,112,113,118,120%5D},{%2232%22:%5B61,65,75,78,119,120%5D},{%2233%22:%5B77,78%5D},{%2237%22:%5B78,79%5D},{%2238%22:%5B77,79%5D},{%2239%22:%5B77%5D},{%2240%22:%5B60,61,63,64,75,77%5D},{%2241%22:%5B61,63,75,76%5D},{%2242%22:%5B61,63%5D},{%2243%22:%5B60,61,63,64,114%5D},{%2244%22:%5B78,79,84,85,92,93,95,113,115%5D},{%2245%22:%5B79,84,86,92,93,95,96,97,104,112,115%5D},{%2246%22:%5B78,86,98,103,105,111,113,114%5D},{%2247%22:%5B75,77,86,87,92,93,95,96,97,102,105,110,112%5D},{%2248%22:%5B75,76,93,95,103,104,109,112%5D},{%2249%22:%5B93,95,110,111%5D},{%2250%22:%5B94%5D}%5D
import React, { Component } from 'react';
import Cell from './Cell';
import NeighborCounter from '../NeighborCounter';

export default class Board extends Component {
  constructor(props) {
    super(props);

    let items = new Array(props.width * props.height);
    for (var i = 0; i < items.length; i++) {
      items[i] = { index: i, alive: false }
    }

    this.state = { cells: items };

    this.updateCell = this.updateCell.bind(this);
    this.startTick = this.startTick.bind(this);
  }

  startTick() {
    console.info('state');
    console.log(JSON.stringify(this.state));
    this.timerID = setInterval(
      () => this.tick(),
      250
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  createKey(cell) {
    return 'c' + cell.index;
  }

  tick() {
    let cells = JSON.parse(JSON.stringify(this.state.cells));
    const neighborCounter = new NeighborCounter({
      width: this.props.width,
      height: this.props.height,
      cells: this.state.cells
    });

    let alive = false;
    for (let i = 0; i < cells.length; i++) {
      //console.log('current cell:  ' + JSON.stringify(cells[i]));
      //console.log('----------');
      cells[i].alive = neighborCounter.itsAlive(cells[i]);
      if (cells[i].alive) {
        alive = true;
      }
    }

    this.setState(state => ({ cells: cells }));

    console.log('Alive: ' + alive);
    if (!alive) {
      clearInterval(this.timerID);
    }

    console.info('state');
    console.log(JSON.stringify(this.state));
  }

  updateCell(index, newState) {
    this.setState(
      state => ({
        cells: state.cells.map(
          (cell, mapIndex) => (
            index === mapIndex ? Object.assign(cell, { alive: newState }) : cell
          )
        )
      })
    );
    //console.info('updateCell State');
    //console.log(this.state);
  }

  render() {
    //console.log('El rendero called');
    // i=y*W + x   y = i / W   x = i % W
    return (
      <div className="container">
        {this.state.cells.map((cell, index) =>
          <Cell key={this.createKey(cell)}
                data={cell}
                updater={this.updateCell}
          />
        )}

        <button onClick={this.startTick}>Start</button>
      </div>
    );
  }
}
