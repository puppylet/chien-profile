/* eslint-disable */
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const TooltipContent = ({name, description}) => <div className='tech-description'>
  <h6>{name}</h6>
  <p>{description}</p>
</div>;


export default ({tech, items}) => <div style={{width: 100/items + '%'}} className='tech'>
  <OverlayTrigger placement='top' overlay={<Tooltip id={1}><TooltipContent {...tech} /></Tooltip>}>
    <a
      className='tech-item'
      data-toggle="tooltip"
      data-placement="top"
      href={tech.url}
      target='_blank'
      style={{ backgroundImage: `url(${tech.logo}` }} />
  </OverlayTrigger>
</div>
