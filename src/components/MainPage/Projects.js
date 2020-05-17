import React, { Component } from 'react'

export default class Projects extends Component {
  render () {
    return <section id="projects" className="section works">
      <div className="container">
        <div className="row mb-50">
          <div className="col-md-12">
            <div className="section-title">
              <h2 className="text-dark mb-0">My Works</h2>
              <p className="text-muted mb-0">A latest creative works in design and web .</p>
            </div>
          </div>
        </div>

        <div className="row works-items">
          <div className="col-lg-4 col-md-6">

            <div className="item">
              <div className="image">
                <img src="assets/img/works/1.jpg" alt="" />
                <div className="overly">
                  <a href="assets/img/works/1.jpg" className="view-work"> View Work</a>
                </div>
              </div>

              <div className="details d-flex align-items-center">
                <p className="mb-0">Graphic Design</p>
                <a href="#" className="ml-auto"><i className="fas fa-external-link-alt"></i> </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">

            <div className="item">
              <div className="image">
                <img src="assets/img/works/2.jpg" alt="" />
                <div className="overly">
                  <a href="assets/img/works/2.jpg" className="view-work"> View Work</a>
                </div>
              </div>

              <div className="details d-flex align-items-center">
                <p className="mb-0">PSD Template Design</p>
                <a href="#" className="ml-auto">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">

            <div className="item">
              <div className="image">
                <img src="assets/img/works/3.jpg" alt="" />
                <div className="overly">
                  <a href="assets/img/works/3.jpg" className="view-work"> View Work</a>
                </div>
              </div>

              <div className="details d-flex align-items-center">
                <p className="mb-0">Mobile Application</p>
                <a href="#" className="ml-auto">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">

            <div className="item">
              <div className="image">
                <img src="assets/img/works/4.jpg" alt="" />
                <div className="overly">
                  <a href="assets/img/works/4.jpg" className="view-work"> View Work</a>
                </div>
              </div>

              <div className="details d-flex align-items-center">
                <p className="mb-0">Graphic Design</p>
                <a href="#" className="ml-auto">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">

            <div className="item">
              <div className="image">
                <img src="assets/img/works/5.jpg" alt="" />
                <div className="overly">
                  <a href="assets/img/works/5.jpg" className="view-work"> View Work</a>
                </div>
              </div>

              <div className="details d-flex align-items-center">
                <p className="mb-0">PSD Template Design</p>
                <a href="#" className="ml-auto">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">

            <div className="item">
              <div className="image">
                <img src="assets/img/works/6.jpg" alt="" />
                <div className="overly">
                  <a href="assets/img/works/6.jpg" className="view-work"> View Work</a>
                </div>
              </div>

              <div className="details d-flex align-items-center">
                <p className="mb-0">Mobile Application</p>
                <a href="#" className="ml-auto">
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}
