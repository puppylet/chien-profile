import React, { Component } from 'react'
import HomePage from './HomePage'
import About from './About'
import Projects from './Projects'
import Social from './Social'
import Footer from './Footer'
import TestBootstrap from "./TestBootstrap";
import Contact from "./Contact";

export default class MainPage extends Component {
  render () {
    return (
      <div className='main'>
        <HomePage />
        <About />
        <Projects />

        <Contact/>

        <Footer />
        <Social />
      </div>
    )
  }
}
