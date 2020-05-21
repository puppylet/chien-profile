import React from 'react'
import { useSelector } from 'react-redux'
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


export default () => {
  const testimonials = useSelector(state => state.profile.data.testimonial)
  // console.log(testimonials)

  return <section className='section testimonials mt-0'>


    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <Carousel
            showArrows={false}
            autoPlay
            centerSlidePercentage
            infiniteLoop
            stopOnHover

          >
            {testimonials && testimonials.map((testimonial, index) => {
              return <div className='item d-flex'>
                <div className='image'>
                  <img src={testimonial.avatar} alt='' />
                </div>
                <div className='content'>
                  <span className='icon_quotations_alt2 mb-0 icon' />
                  <div className='text-muted mb-30 mt-30 testimonial-wrap'>
                    <div className='testimonial-quote'>
                      {testimonial.message}
                    </div>
                  </div>
                  <p className='author text-dark mb-0 '>
                    <span className='font-w-700'>{testimonial.name}</span>
                    <span className='dot' />
                    <span>{testimonial.position}</span> at <b>{testimonial.company}</b>
                    <span className='dot' />
                    <small className='text-muted'>My {testimonial.relationship}</small>
                  </p>
                </div>
              </div>

            })}
          </Carousel>
        </div>
      </div>
    </div>
  </section>
}
