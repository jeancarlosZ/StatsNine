import React, { Component, Fragment } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import UniversalRoutes from './routes/UniversalRoutes';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return <UniversalRoutes />;
  }
}

/**
 * CONTAINER
 */

export default withRouter(Routes);
