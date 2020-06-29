import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { profile } from './resource/models'
import { GET_PROFILE_SUCCESS, GET_PROFILE } from './redux/reducers/profile'
import MenuToggle from './components/MenuToggle'
import Header from './components/header'
import MainPage from './components/MainPage'
import { get } from './resource/resourceServices'

export default () => {
  const isLoading = useSelector(state => state.profile.data.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) dispatch({ type: 'GET_USER_INFO', payload: JSON.parse(userInfo) })
    dispatch({ type: GET_PROFILE })
    get(profile).then(res => dispatch({ type: GET_PROFILE_SUCCESS, payload: res }))
    //eslint-disable-next-line
  }, [])


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
