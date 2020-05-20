import React from 'react'
import ExperienceItem from './ExperienceItem'

export default ({ experience, allTechs }) => <div className='col-lg-8'>
  <h5 className='text-dark mb-30'>My Expericence</h5>
  <div className='timeline'>
    {experience.map(experience => <ExperienceItem
      key={experience.name}
      experience={experience}
      allTechs={allTechs}
    />)}
  </div>
</div>

