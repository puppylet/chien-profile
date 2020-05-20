import React, { Component } from 'react'

export default class Logo extends Component {
  render () {
    return (
      <div className='logo bg-base-color'>
        {/*<a href='/' className='text-white mb-0'>CD</a>*/}
        <img src='assets/img/hero.jpg' alt='' style={{maxWidth: 52}}/>
      </div>
    )
  }
}
