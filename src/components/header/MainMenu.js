import React, { Component } from 'react'
import {Nav} from 'react-bootstrap'

export default class MainMenu extends Component {
  render () {

    const menus = ['home', 'about', 'projects', 'designs', 'source', 'clients', 'contact']

    return (
      <div className="main-menu" id="js-menu">
        <div className="cross bg-base-color">
          <span><i className="fas fa-times text-white"/></span>
        </div>
        <nav className="menu">
          <Nav className='menu-nav' activeKey="/#">
            {menus.map((menu, index) => <Nav.Item key={index}>
              <Nav.Link
                id={'nav-'+menu}
                className='main-nav-item'
                href={`#${menu}`}>
                {menu}
              </Nav.Link>
            </Nav.Item>)}
          </Nav>
        </nav>
      </div>
    )
  }
}
