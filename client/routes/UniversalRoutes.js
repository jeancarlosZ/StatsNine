import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import ExamplePage from '../api/ExamplePage'
import TestPage from '../api/TestPage'
import AboutUs from '../components/home/AboutUs'
import Calendar from '../components/home/Calendar'
import Homepage from '../components/home/Homepage'
import NotFound from '../components/home/NotFound'
import Financialspage from '../components/overviewcontainer/fin/Financialspage'
import KeyMetrics from '../components/overviewcontainer/keymetrics/KeyMetrics'
import Overviewpage from '../components/overviewcontainer/Overviewpage'
import Table from '../components/screener/Table'

import Welcome from '../components/home/Welcome'
//import TableR from '../components/home/common/TableR';
import Dashboard from '../components/home/common/Dashboard'

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/overviewpage/keymetrics" component={KeyMetrics} />
        <Route path="/overviewpage/financials" component={Financialspage} />
        <Route exact path="/overviewpage" component={Overviewpage} />

        <Route path="/test" component={TestPage} />
        <Route path="/example" component={ExamplePage} />
        <Route path="/screener" component={Table} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/calendar" component={TestPage} />
        <Route path="/home" component={TestPage} />
        <Route path="/" exact component={TestPage} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default withRouter(UniversalRoutes)
