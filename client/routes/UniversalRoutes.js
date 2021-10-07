import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import ExamplePage from '../api/ExamplePage'
import TestPage from '../api/TestPage'
import Homepage from '../components/generalpages/homepage/Homepage'

//* ^ Import components ^

class UniversalRoutes extends Component {
  render() {
    return (
      <Switch>
        {/* <Route path="/about" component={About} /> */}

        <Route path="/test" component={TestPage} />
        <Route path="/example" component={ExamplePage} />

        <Route path="/home" component={Homepage} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    )
  }
}

export default withRouter(UniversalRoutes)
