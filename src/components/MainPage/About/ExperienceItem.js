import React from 'react'
import ShowMore from 'react-show-more'
import TechItem from './TechItem'
import moment from 'moment'

export default ({experience, allTechs}) => {
  const techs = allTechs.filter(tech => experience.tech.indexOf(tech._id) !== -1)
  const {isCurrent, from, to} = experience
  let fromStr = moment(from).format('MM/YYYY')
  let toStr = ''
  if (isCurrent) toStr = 'present'
  else toStr = moment(to).format('MM/YYYY')
  return <div className='item'>
    <div className='content'>
      <small className='text-muted'>{fromStr} - {toStr}</small>
      <h6 className='text-dark mb-0'>{experience.position}</h6>
      <b className='text-muted'>{experience.name}</b>

      <div className='text-dark pt-15 mb-0'>
        <ShowMore
          lines={2}
          more=' show more'
          less=' show less'
          anchorClass='show-more-anchor'
        >
          {experience.description}
        </ShowMore>
      </div>
      {!!techs.length && <>
        <p style={{marginTop: 20}}><strong>Technologies used:</strong></p>
        <div className='row'>
          <div className='col-12'>
            {techs.map(tech => <TechItem key={tech.name} items={20} tech={tech} /> )}
          </div>
        </div>
      </>}

    </div>
  </div>
}
