import React, { Component } from 'react'
import HomePage from './HomePage'
import About from './About'
import Projects from './About/Projects'
import Social from './Social'
import Footer from './Footer'
import Contact from "./Contact";
import Designs from './Designs'
import Clients from "./Clients";
import Source from "./Source";

export default class MainPage extends Component {
  render () {
    return (
      <div className='main'>
        <HomePage />
        <About />
        <Projects />
        <Designs />
        <Source />
        <Clients />
        <Contact/>
        <Footer />
        <Social />
      </div>
    )
  }
}
