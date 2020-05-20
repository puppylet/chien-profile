import React, { Component } from 'react'
import MenuToggle from '../components/MenuToggle'
import Header from '../components/header'
import MainPage from '../components/MainPage'
import { connect } from 'react-redux'

class Home extends Component {
  componentDidMount () {
    const {dispatch} = this.props
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) dispatch({type: 'GET_USER_INFO', payload: JSON.parse(userInfo)})
    dispatch({type: 'GET_PROFILE'})
  }

  render () {
    const {isLoading} = this.props
    return (
      <div className='Home'>
        <MenuToggle />
        <Header />
        <MainPage />

        {isLoading && <div className="loading">
          <div className="circle" />
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {isLoading: state.profile.isLoading}
}

export default connect(mapStateToProps)(Home)
