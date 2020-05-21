import React, {useEffect, useState} from 'react'
import ShowMore from 'react-show-more'
import {useSelector} from 'react-redux'
import {Modal} from 'react-bootstrap'
import TechItem from './TechItem'

const ProjectItem = ({ name, logo, description, imageHeight, tech }) => {
  const allTechs = useSelector(state => state.profile.data.tech)
  const techs = allTechs.filter(t => tech.indexOf(t._id) !== -1)
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  return <div className='col-lg-3 col-md-3 col-sm-2'>
    <div className='item'>
      <div className='image'>
        <div className='flip-card'>
          <div className='flip-card-inner'>
            <div className='flip-card-front'>
              <img src={logo} alt='Avatar' />
            </div>
            <div className='flip-card-back'>
              <h5>{name}</h5>
              <div>
                <ShowMore lines={Math.round(imageHeight - 160)/18} more='...'>
                  {description}
                </ShowMore>
              </div>

              <button
                onClick={handleShow}
                className='btn btn-custom width-100 mt-20'
              >See more details</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header><h4>{name}</h4></Modal.Header>
      <Modal.Body>
        <h6>About {name}</h6>
        <p>{description}</p>
        <h6>Technologies I have used on this project</h6>
        {techs.map(tech => <TechItem key={tech.name} items={20} tech={tech} /> )}
      </Modal.Body>
    </Modal>

  </div>
}

export default () => {
  const projects = useSelector(state => state.profile.data.project)
  const [imageHeight, setImageHeight] = useState(255)
  useEffect(() => {
    const image = window.$('#projects').find('img')[0]
    const height = window.$(image).height()
    console.log('height', height)
    setImageHeight(height || 255)
  }, [projects])
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
        {projects && projects.map(project => <ProjectItem
          imageHeight={imageHeight}
          key={project._id}
          {...project} />)}
      </div>
    </div>
  </section>
}
