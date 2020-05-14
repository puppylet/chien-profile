import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LazyLoad from './utils/LazyLoad'

const Test = () => <LazyLoad component={React.lazy(() => import('./scenes/Test'))} />
const Home = () => <LazyLoad component={React.lazy(() => import('./scenes/Home'))} />
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
