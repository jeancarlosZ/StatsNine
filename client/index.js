import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import history from './history'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import '../public/style.css'
import '../public/styles/fin.css'
import '../public/styles/growthmetrics.css'
import '../public/styles/header.css'
import '../public/styles/keymetrics.css'
import '../public/styles/pricemetrics.css'
import '../public/styles/safetymetrics.css'
import '../public/styles/qualitymetrics.css'
import '../public/styles/overviews.css'
import '../public/styles/dashstyle.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
