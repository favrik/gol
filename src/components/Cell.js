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
    return this.props.data.alive ? 'live' : 'dead';
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data.alive !== nextProps.data.alive) {
      return true;
    }

    if (this.state.alive !== nextState.alive) {
      return true;
    }

    return false;
  }

  render() {
    //console.log(this.props.data.index + ' cell rendered');

    return (
      <div className={'cell cell-' + this.cssClass() } onClick={this.toggleLife}></div>
    );
  }
}
