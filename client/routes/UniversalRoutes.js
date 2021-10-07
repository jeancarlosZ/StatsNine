import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Homepage from "../components/generalpages/homepage/Homepage";
import AboutUs from "../components/generalpages/aboutus/AboutUs";
import Table from "../components/screener/Table";

//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/screener" component={Table} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/home" component={Homepage} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    );
  }
}

export default withRouter(UniversalRoutes);
