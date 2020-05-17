import React, { Component } from 'react'

export default class MainMenu extends Component {
  render () {

    const menus = ['home', 'about', 'projects', 'designs', 'clients', 'testimonials', 'contact']

    return (
      <div className="main-menu" id="js-menu">
        <div className="cross bg-base-color">
          <span><i className="fas fa-times text-white"/></span>
        </div>
        <nav className="menu">
          <ul className="menu-nav">
            {menus.map((menu, index) =><li className="nav-item">
              <a className="nav-link" href={`#${menu}`}>{menu}</a>
            </li>)}
          </ul>
        </nav>
      </div>
    )
  }
}
