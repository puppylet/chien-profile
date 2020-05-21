import React, { Component } from 'react'
import ShowMore from 'react-show-more'

const ProjectItem = ({ name, photo, description }) => <div className='col-lg-3 col-md-3 col-sm-2'>
  <div className='item'>
    <div className='image'>
      <div className='flip-card'>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <img src={photo} alt='Avatar' />
          </div>
          <div className='flip-card-back'>
            <h5>Flownote</h5>
            <div>
              <ShowMore lines={6} more=''>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, eligendi fugiat in
                laudantium magni quod veritatis! Consequuntur debitis dolore mollitia nam obcaecati ratione? Asperiores
                debitis earum iure provident quam suscipit.
              </ShowMore>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</div>

export default () => {
  const projects = [
    {
      name: '',
      photo: 'assets/img/works/3.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/1.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/7.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/5.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/4.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/6.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/2.jpg',
      description: ''
    },
    {
      name: '',
      photo: 'assets/img/works/1.jpg',
      description: ''
    }
  ]
  return <section id='projects' className='section works'>
    <div className='container'>
      <div className='row mb-50'>
        <div className='col-md-12'>
          <div className='section-title'>
            <h2 className='text-dark mb-0'>My Works</h2>
            <p className='text-muted mb-0'>A latest creative works in design and web .</p>
          </div>
        </div>
      </div>

      <div className='row works-items projects'>
        {projects.map(project => <ProjectItem key={project.name} {...project} />)}
      </div>
    </div>
  </section>
}
