import React, { Component } from 'react'
import Logo from './Logo'
import MainMenu from './MainMenu'
import ShareButton from './ShareButton'

export default class Header extends Component {
  render () {
    return (
      <div className='header-left' id='scrollspy'>
        <Logo />
        <MainMenu />
        <ShareButton />
      </div>
    )
  }
}
