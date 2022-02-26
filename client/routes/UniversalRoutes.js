import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Terms from "../components/home/Terms";
import NotFound from "../components/home/NotFound";
import Financialspage from "../components/overviewcontainer/fin/Financialspage";
import KeyMetrics from "../components/overviewcontainer/keymetrics/KeyMetrics";
import Overviewpage from "../components/overviewcontainer/Overviewpage";
import Table from "../components/screener/Table";
import Dashboard from "../components/home/Dashboard";

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/overviewpage/keymetrics" component={KeyMetrics} />
        <Route path="/overviewpage/financials" component={Financialspage} />
        <Route exact path="/overviewpage" component={Overviewpage} />
        <Route path="/screener" component={Table} />
        <Route path="/terms" component={Terms} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/home" component={Dashboard} />
        <Route path="/" exact component={Dashboard} />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

export default withRouter(UniversalRoutes);
