import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Homepage from '../components/generalpages/homepage/Homepage';
import Overviewpage from '../components/overviewcontainer/Overviewpage';
import Overview from '../components/overviewcontainer/overview/Overview';
import Financials from '../components/overviewcontainer/fin/Financialspage';
//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* <Route path="/about" component={About} /> */}
        <Route path="/home" component={Homepage} />
        {/* <Route exact path="/" component={Homepage} /> */}
        <Route exact path="/overviewcontainer" component={Overviewpage} />
        <Route exact path="/overview" component={Overview} />
        <Route exact path="/overview/financials" component={Financials} />
      </Switch>
    );
  }
}

export default withRouter(UniversalRoutes);
