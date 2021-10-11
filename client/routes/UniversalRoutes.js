import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Homepage from '../components/home/Homepage';
import Overviewpage from '../components/overviewcontainer/Overviewpage';
import ExamplePage from '../api/ExamplePage';
import TestPage from '../api/TestPage';
import AboutUs from '../components/home/aboutus';
import Table from '../components/screener/Table';
//import KeyMetrics from '../components/overviewcontainer/keymetrics/KeyMetrics';
import Financialspage from '../components/overviewcontainer/fin/Financialspage';
import Income from '../components/overviewcontainer/fin/Income';
import Balance from '../components/overviewcontainer/fin/Balance';
import Cash from '../components/overviewcontainer/fin/Cash';
import Dividends from '../components/overviewcontainer/fin/Dividends';
import NotFound from '../components/home/NotFound';
import Calendar from '../components/home/Calendar';

//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/overviewpage/financials/dividends"
          component={Dividends}
        />
        <Route path="/overviewpage/financials/balance" component={Balance} />
        <Route path="/overviewpage/financials/cashflow" component={Cash} />
        <Route path="/overviewpage/financials" component={Financialspage} />
        {/* <Route path="/overviewpage/keymetrics" component={KeyMetrics} /> */}
        <Route path="/overviewpage" exact component={Overviewpage} />
        <Route path="/test" component={TestPage} />
        <Route path="/example" component={ExamplePage} />
        <Route path="/screener" component={Table} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/home" component={Homepage} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default withRouter(UniversalRoutes);
