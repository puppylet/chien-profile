import React, { Component } from 'react'
import { connect } from 'react-redux'
import Experiences from './Experiences'
import Technologies from './Technologies'
import Skills from './Skills'

class About extends Component {
  render () {
    const { profile } = this.props
    return (
      <section id="about" className="section about">
        <div className="container">
          <div className="row mb-50 pt-30">
            <div className="col-md-12">
              <div className="section-title">
                <h2 className="text-dark mb-0">About me</h2>
                <p className="text-muted mb-0">Main informations about me and what I love to do.</p>
              </div>
            </div>
          </div>
          <div className="row mb-50">
            <div className="col-lg-5">
              <div className="hero">
                <img src="assets/img/hero.jpg" alt="" />
              </div>
            </div>

            <div className="col-lg-7 d-flex align-items-center">
              <div className="details">
                <p className="text-dark mb-25">
                  I am a Senior Web Developer - Graphic Designer who has
                  an immense love for both computer science and art.
                  I soon realized that Web Programming is a beautiful
                  mixture of arts, mathematics, designing and coding, so it
                  was an easy decision to follow my chosen career path.
                  My motto is “Impossible is a word only found in the
                  dictionary of fools” meaning that with my creative
                  imagination and strong technical background, I am
                  capable of applying logic into systems and machines in
                  order to make any client’s ideas come true.
                </p>

                <ul className="info mb-5 list-inline">
                  <li className="text-dark">
                    <span className="font-w-600"><i className="fa fa-user" /></span> Le Tat Chien
                  </li>
                  <li className="text-dark">
                    <span className="font-w-600"><i className="fa fa-phone" /></span> +84 32 737 8918
                  </li>
                  <li className="text-dark">
                    <span className="font-w-600"><i className="fa fa-calendar-minus" /></span> 09-05-1984
                  </li>
                  <li className="text-dark">
                    <span className="font-w-600"><i className="fa fa-envelope" /></span>&nbsp;
                    <a href="mailto:me@chindezign.info" className="text-dark">me@chindezign.info</a>
                  </li>
                  <li className="text-dark">
                    <span className="font-w-600"><i className="fa fa-globe" /></span> Vietnam
                  </li>
                  <li className="text-dark">
                    <span className="font-w-600"><i className="fa fa-map-marker" /></span> Thuan An, Binh Duong
                  </li>
                </ul>

                <a href="#about" className="btn-custom grey">
                  <span><i className="fas fa-cloud-download-alt" /></span>
                  <span>Downland My CV</span>
                </a>
                <a href="#about" className="btn-custom" style={{ marginLeft: 10 }}>
                  <span>I'm availabe.  Hire me now!</span>
                </a>
              </div>
            </div>

          </div>

          <div className='row'>
            {profile.tech && <Technologies tech={profile.tech} />}
            {profile.skill && <Skills skill={profile.skill} />}
          </div>

          <div className="row ">
            {profile.experience && <Experiences
              experience={profile.experience}
              allTechs={profile.tech} />}
            <div className="col-lg-4">
              <h5 className="text-dark mb-30">My Education</h5>
              <div className="timeline">
                <div className="item">
                  <div className="content">
                    <h6 className="text-dark mb-0">Enginering Degree
                      <span className="text-muted"> - </span> Paris University</h6>
                    <small className="text-muted">2015 - 2016</small>
                    <p
                      className="text-dark pt-15 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit praesentium aut repellendus rem non repudiandae
                      sint dolor illo officia dignissimos.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <h6 className="text-dark mb-0">Master Degree
                      <span className="text-muted"> - </span> Paris University</h6>
                    <small className="text-muted ">2016 - 2018</small>
                    <p
                      className="text-dark pt-15 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit praesentium aut repellendus rem non repudiandae
                      sint dolor illo officia dignissimos.</p>
                  </div>
                </div>

                <div className="item">
                  <div className="content">
                    <h6 className="text-dark mb-0">Bachlor Degree
                      <span className="text-muted"> - </span> Paris University</h6>
                    <small className="text-muted">2015 - 2016 </small>
                    <p
                      className="text-dark pt-15 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit praesentium aut repellendus rem non repudiandae
                      sint dolor illo officia dignissimos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { profile: state.profile.data }
}

export default connect(mapStateToProps)(About)
