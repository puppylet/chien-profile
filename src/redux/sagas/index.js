import { all } from 'redux-saga/effects'
import testSaga from './test'

export default function * rootSaga (getState) {
  yield all([
    testSaga()
  ])
}
