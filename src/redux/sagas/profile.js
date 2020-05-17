import { put, takeEvery, fork, all } from 'redux-saga/effects';
import {get} from '../../resource/resourceServices'
import {profile} from '../../resource/models'


function* getProfile(action) {
  yield get(profile).then(res => action.data = res)
  yield put({ type: 'GET_PROFILE_SUCCESS', payload: action });
}

export function* _profile() {
  yield takeEvery('GET_PROFILE', getProfile);
}

export default function* rootSaga() {
  yield all([fork(_profile)]);
}
