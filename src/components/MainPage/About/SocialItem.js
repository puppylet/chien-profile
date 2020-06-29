import React from 'react'
export default ({url, iconName, isBrand = true}) => <li>
  <a target='_blank' href={url} className='text-dark' rel='noopener noreferrer'>
    <i className={`fa${isBrand ? 'b' : ''} fa-${iconName}`} />
  </a>
</li>
