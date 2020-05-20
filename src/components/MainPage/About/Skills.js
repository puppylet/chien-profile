import React from 'react'
import SkillItem from './SkillItem';

const skills = [
  {name: 'HTML5 - Master at building responsive layout', percentage: 95},
  {name: 'CSS/SASS', percentage: 96},
  {name: 'Javascript (ReactJS/Jquery/AngularJS)', percentage: 90},
  {name: 'NodeJS/MongoDB', percentage: 75},
  {name: 'PHP/MySql', percentage: 90},
  {name: 'Python (Flask)', percentage: 60},
  {name: 'Graphic Design', percentage: 85},
  {name: 'UI Design', percentage: 75},
  {name: 'Amazone AWS', percentage: 60},
  {name: 'Computer & Network', percentage: 75},
  {name: 'MS Office (I\'ve taught it for 7 years)', percentage: 97},
  {name: 'Training', percentage: 85},
];

export default () => <div className='col-lg-7 skills'>
  <h5>My skills</h5>
  <div className='row'>
    {skills.map(skill => <SkillItem key={skill.name} {...skill} />)}
  </div>


</div>
