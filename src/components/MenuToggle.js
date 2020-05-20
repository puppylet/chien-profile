import React, { Component } from 'react'

export default class MenuToggle extends Component {
  doToggleMenu = () => {}
  render () {
    return (
      <div className='menu-toggle' id='menuToggle' onClick={this.doToggleMenu}><span /></div>
    )
  }
}
