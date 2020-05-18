import React from 'react'
import TechItem from './TechItem'

export default ({tech}) => <div className='col-lg-5 techs'>
  <h5>Technologies I have used</h5>
  {tech.map((t, index) => <TechItem key={index} tech={t} />)}
</div>
