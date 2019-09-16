import React from 'react';
import { Header } from './components/Header';
import { MainBody } from './components/MainBody';

export const MainApp = () => {
  return (
    <React.Fragment>
      <Header />
      <MainBody />
    </React.Fragment>
  )
}
