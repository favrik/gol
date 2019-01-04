import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = { alive: props.data.alive };
    this.toggleLife = this.toggleLife.bind(this);
  }

  toggleLife() {
    let newState = !this.state.alive;

    this.props.updater(this.props.data.index, newState)

    this.setState(
      state => ({ alive: newState })
    );
  }

  cssClass() {
    return this.state.alive ? 'live' : 'dead';
  }

  render() {
    return (
      <div className={'cell cell-' + this.cssClass() } onClick={this.toggleLife}></div>
    );
  }
}
