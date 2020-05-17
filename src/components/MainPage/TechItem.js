import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default ({tech, items}) => <div style={{width: 100/items + '%'}} className='tech'>
  <OverlayTrigger
    placement='top'
    overlay={
      <Tooltip>
        <div className='tech-description'>
          <h6>{tech.name}</h6>
          <p>{tech.description}</p>
        </div>
      </Tooltip>
    }
  >
    <a
      className='tech-item'
      data-toggle="tooltip"
      data-placement="top"
      href={tech.url}
      target='_blank'
      style={{ backgroundImage: `url(${tech.logo}?${new Date().getTime()})` }} />
  </OverlayTrigger>
</div>
