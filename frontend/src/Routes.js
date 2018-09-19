import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RepresentativeFinder from './components/RepresentativeFinder'
import states from './components/us-states.json'

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route path='/:type/:state' component={RepresentativeFinder} />
        <Redirect to={`/senators/${Object.keys(states)[0]}`} from='/' />
      </Switch>
    )
  }
}

export default Routes
