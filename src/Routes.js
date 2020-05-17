import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './scenes/Home'
import Test from './scenes/Test'
export default class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/test' component={Test} />
      </Switch>
    )
  }
}
