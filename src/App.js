import React, { Component } from 'react';
import { Header } from './components/header';
import { MainBody } from './components/main-body';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainBody />
      </React.Fragment>
    )
  }
}

export default App;
