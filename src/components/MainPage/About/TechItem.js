/* eslint-disable */
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import TooltipContent from '../../common/TooltipContent'

export default ({tech, items}) => <div style={{width: 100/items + '%'}} className='tech'>
  <OverlayTrigger placement='top' overlay={<Tooltip id={1}><TooltipContent {...tech} /></Tooltip>}>
    <a
      className='tech-item'
      data-toggle='tooltip'
      data-placement='top'
      href={tech.url}
      target='_blank'
      style={{ backgroundImage: `url(${tech.logo}` }} />
  </OverlayTrigger>
</div>
