import React from 'react';
import Header from './components/Header';
import Routes from './Routes';
import Newsfeed from './components/generalpages/homepage/Newsfeed';
import Homepage from './components/generalpages/homepage/Homepage';

const App = () => {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
};

export default App;
