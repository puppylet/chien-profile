import React from 'react'
import TooltipContent from '../../common/TooltipContent'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default ({ client, items }) => <div style={{ width: 100 / items + '%' }} className='client'>
  <OverlayTrigger placement='top' overlay={<Tooltip id={1}><TooltipContent {...client} /></Tooltip>}>
    <a
      className='client-item'
      data-toggle='tooltip'
      data-placement='top'
      href={client.website}
      target='_blank'
      rel='noopener noreferrer'
      style={{ backgroundImage: `url(${client.logo}` }} ><span>&nbsp;</span></a>
  </OverlayTrigger>
</div>
