import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Homepage from '../components/generalpages/homepage/Homepage';
import Overviewpage from '../components/overviewcontainer/Overviewpage';
import ExamplePage from '../api/ExamplePage';
import TestPage from '../api/TestPage';
import AboutUs from '../components/generalpages/aboutus/AboutUs';
import Table from '../components/screener/Table';
import KeyMetrics from '../components/overviewcontainer/keymetrics/KeyMetrics';
import Financialspage from '../components/overviewcontainer/fin/Financialspage';
//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/overviewpage" component={Overviewpage} />
        {/* <Route exact path="/overviewpage/keymetrics" component={KeyMetrics} /> */}
        <Route path="/overviewpage/keymetrics" component={KeyMetrics} />
        {/* <Route path="/overviewpage/keymetrics" component={KeyMetrics} /> */}
        <Route path="/overviewpage/financials" component={Financialspage} />
        {/* <Route path="/about" component={About} /> */}

        <Route path="/test" component={TestPage} />
        <Route path="/example" component={ExamplePage} />
        <Route path="/screener" component={Table} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/home" component={Homepage} />
        <Route exact path="/" component={Homepage} />
        {/* <Route exact path="/" component={Homepage} /> */}
      </Switch>
    );
  }
}

export default withRouter(UniversalRoutes);
