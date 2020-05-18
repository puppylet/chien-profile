import React from 'react'
import {ProgressBar} from 'react-bootstrap'

export default () => <div className='col-lg-7 skills'>
  <h5>My skills</h5>
  <div className='row'>
    <div className='col-lg-6'>
      <small className='text-muted'>HTML5 - Master at building responsive layout </small>
      <ProgressBar now={95} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>CSS/SASS</small>
      <ProgressBar now={96} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>Javascript (ReactJS/Jquery/AngularJS)/</small>
      <ProgressBar now={90} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>NodeJS/MongoDB</small>
      <ProgressBar now={75} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>PHP/MySql</small>
      <ProgressBar now={90} />
    </div>

    <div className='col-lg-6'>
      <small className='text-muted'>Python (Flask)</small>
      <ProgressBar now={60} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>Graphic Design</small>
      <ProgressBar now={85} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>UI Design</small>
      <ProgressBar now={75} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>Graphic Design</small>
      <ProgressBar now={85} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>UI Design</small>
      <ProgressBar now={75} />
    </div>

    <div className='col-lg-6'>
      <small className='text-muted'>Graphic Design</small>
      <ProgressBar now={85} />
    </div>
    <div className='col-lg-6'>
      <small className='text-muted'>UI Design</small>
      <ProgressBar now={75} />
    </div>
  </div>


</div>
