import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Board width="50" height="50" />
      </div>
    );
  }
}
