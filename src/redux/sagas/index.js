import { all } from 'redux-saga/effects'
import testSaga from './test'
import profile from './profile'

export default function * rootSaga (getState) {
  yield all([
    testSaga(),
    profile()
  ])
}
