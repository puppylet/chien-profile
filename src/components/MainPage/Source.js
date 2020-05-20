import React, { Component } from 'react'

export default class Source extends Component {
  render () {
    return <section id='source' className='section source'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div>
              <h2 className='text-dark mb-0'>This Page Source Code</h2>
              <p className='text-muted' style={{ fontSize: '18px' }}>
                It's took me about 5 days to build this page. <br />
                Including this main page, the back-end, and a CMS to manage the content. <br />
                I built them from scratch. <br />
                Let's check the repos below and see what I can do in such a short amount of time.
              </p>


              <p>
                <a
                  target="_blank" className='btn btn-custom white margin'
                  href='https://github.com/puppylet/chien-profile'>
                  The main page and back-end repo
                </a>
                <a
                  target="_blank" className='btn btn-custom white margin'
                  href='https://github.com/puppylet/chien_profile_admin'>
                  The CMS repo
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  }
}
