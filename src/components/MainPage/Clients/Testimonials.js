import React from 'react'
import { useSelector } from 'react-redux'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { CarouselProvider, Slider, Slide, DotGroup} from 'pure-react-carousel'

export default () => {
  const testimonials = useSelector(state => state.profile.data.testimonial)
  // console.log(testimonials)

  return <section className='section testimonials mt-0'>


    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <CarouselProvider
            naturalSlideWidth={50}
            naturalSlideHeight={15}
            totalSlides={testimonials ? testimonials.length : 0}
          >
            <Slider>
              {testimonials && testimonials.map((testimonial, index) => {
                return <Slide index={index}>
                  <div className='item d-flex align-items-center'>
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
                </Slide>
              })}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </div>
  </section>
}
