import React from 'react'
import { useSelector } from 'react-redux'
import SocialItem from './About/SocialItem'

export default () => {
  const userInfo = useSelector(state => state.user)
  const socials = [
    { url: 'https://www.facebook.com/chiendezign', iconName: 'facebook-f' },
    { url: 'skype:chiendezign?userinfo', iconName: 'skype' },
    { url: 'https://www.linkedin.com/in/nhokchien/', iconName: 'linkedin' },
    { url: 'https://github.com/puppylet', iconName: 'github' },
    { url: 'mailto:me@chiendezign.info', iconName: 'envelope', isBrand: false },
    { url: 'tel:+84327378918', iconName: 'phone', isBrand: false }
  ]

  const roles = [
    'Front-end Developer',
    'Back-end Developer',
    'Graphic Designer',
    'UI Designer'
  ]

  const contact = [
    { name: 'Email', data: 'me@chiendezign.info' },
    { name: 'Phone', data: '+84 32 737 8918' },
    { name: 'Location', data: 'Binh Duong, Vietnam' }

  ]
  return <section
    className='home bg-light vh-100' id='home' style={{ backgroundImage: 'url(\'assets/img/bg/bg.jpg\')' }}>
    <div className='container '>
      <div className='row '>
        <div className='col-lg-12 '>
          <div className='social-home'>
            <ul className='list-inline'>
              {socials.map(social => <SocialItem key={social.iconName} {...social} />)}
            </ul>
          </div>

          <div className='d-flex align-items-center vh-100'>
            <div className='full-width'>
              <div className='banner'>
                <h6 className='text-dark'>Hi {userInfo.name
                  ? (userInfo.title || 'Mr.') + ' ' + userInfo.name
                  : 'There'},</h6>
                <h1 className='cd-headline clip text-dark'>I Am a&nbsp;
                  <span className='cd-words-wrapper'>
                    {roles.map((role, i) => <b className={`is-${i === 0 ? 'visible' : 'hidden'}`}>{role}</b>)}
                  </span>
                </h1>

                <p className='max-width-450 text-dark mt-20 mb-30'>
                  With over 15 years experience in graphic design and programming, I can work
                  at an amazing speed, and able to make almost of your ideas come true.
                </p>

                <a href='#about' className='btn-custom'>
                  <span><i className='fas fa-user' /></span>
                  <span> More About Me</span>
                </a>

              </div>
            </div>
          </div>
          <div className='my-info'>
            {contact.map((c, i) => <div key={i} className='item'>
              <p className='text-dark font-w-700 mb-0'>{c.name}</p>
              <p className='text-dark mb-0'>{c.data}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
}
