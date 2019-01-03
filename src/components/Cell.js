import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'dead' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
        status: state.status == 'dead' ? 'live' : 'dead'
      })
    );
  }

  render() {
    return (
      <div className={'cell cell-' + this.state.status } onClick={this.handleClick}></div>
    );
  }
}
