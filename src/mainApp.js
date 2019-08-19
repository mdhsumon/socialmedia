import React, { Component } from 'react';
import { Header } from './components/header';
import { MainBody } from './components/main-body';
import './App.css';

const MainApp = () => {
  return (
    <React.Fragment>
      <Header />
      <MainBody />
    </React.Fragment>
  )
}
export default MainApp;
