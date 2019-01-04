import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { generation: 0 };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(
      state => ({ generation: state.generation + 1 })
    );
  }

  render() {
    return (
      <div className="App">
        <Board generation={this.state.generation} width="3" height="3" />
      </div>
    );
  }
}
