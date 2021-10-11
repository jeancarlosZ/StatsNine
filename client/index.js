<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../public/style.css';
import '../public/styles/fin.css';
import '../public/styles/keymetrics.css';
import '../public/styles/overview.css';
=======
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import '../public/style.css'
import '../public/styles/fin.css'
import '../public/styles/keymetrics.css'
import '../public/styles/pricemetrics.css'
import '../public/styles/growthmetrics.css'
import '../public/styles/overview.css'
import '../public/styles/header.css'
>>>>>>> 25761b5e967f2263941788099ed55840050bc335

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
);
