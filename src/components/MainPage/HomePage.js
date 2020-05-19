import React, { Component } from 'react'

export default class HomePage extends Component {
  render () {
    return (
      <section className="home bg-light vh-100" id="home" style={{backgroundImage: "url('assets/img/bg/bg.jpg')"}}>
        <div className="container ">
          <div className="row ">
            <div className="col-lg-12 ">
              <div className="social-home">
                <ul className="list-inline">
                  <li><a href="https://google.com" className="text-dark"><i className="fab fa-facebook-f"/></a></li>
                  <li><a href="https://google.com" className="text-dark"><i className="fab fa-twitter"/></a></li>
                  <li><a href="https://google.com" className="text-dark"><i className="fab fa-instagram"/></a></li>
                  <li><a href="https://google.com" className="text-dark"><i className="fab fa-dribbble"/></a></li>
                  <li><a href="https://google.com" className="text-dark"><i className="fab fa-behance"/></a></li>
                </ul>
              </div>

              <div className="d-flex align-items-center vh-100">
                <div className="full-width">
                  <div className="banner">
                    <h6 className="text-dark">Hi There,</h6>
                    <h1 className="cd-headline clip text-dark">I Am a&nbsp;
                      <span className="cd-words-wrapper">
                        <b className="is-visible">Front-end Developer</b>
                        <b className="is-hidden">Back-end Developer</b>
                        <b className="is-hidden">Graphic Designer</b>
                        <b className="is-hidden">UI Designer</b>
                      </span>
                    </h1>

                    <p className="max-width-450 text-dark mt-20 mb-30">
                      With over 15 years experience in graphic design and programming, I can work
                      at an amazing speed, and able to make almost of your ideas come true.
                    </p>

                    <a href="#about" className="btn-custom">
                      <span><i className="fas fa-user" /></span>
                      <span> More About Me</span>
                    </a>

                  </div>
                </div>
              </div>
              <div className="my-info">
                <div className="item">
                  <p className="text-dark font-w-700 mb-0">Email</p>
                  <p className="text-dark mb-0">me@chiendezign.info</p>
                </div>

                <div className="item">
                  <p className="text-dark font-w-700 mb-0">Phone</p>
                  <p className="text-dark mb-0">+84327378918</p>
                </div>

                <div className="item">
                  <p className="text-dark font-w-700  mb-0">Location</p>
                  <p className="text-dark mb-0">Binh Duong, Vietnam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
