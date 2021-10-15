import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import ExamplePage from '../api/ExamplePage';
import TestPage from '../api/TestPage';
import AboutUs from '../components/home/AboutUs';
import Calendar from '../components/home/Calendar';
import Homepage from '../components/home/Homepage';
import NotFound from '../components/home/NotFound';
import Financialspage from '../components/overviewcontainer/fin/Financialspage';
import KeyMetrics from '../components/overviewcontainer/keymetrics/KeyMetrics';
import Overviewpage from '../components/overviewcontainer/Overviewpage';
import Table from '../components/screener/Table';

import Welcome from '../components/home/Welcome';

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
        <Route path="/calendar" component={Welcome} />
        <Route path="/home" component={Welcome} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default withRouter(UniversalRoutes);
