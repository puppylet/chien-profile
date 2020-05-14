import { put, takeEvery, fork, all } from 'redux-saga/effects';

const delay = ms => new Promise(res => setTimeout(res, ms));

function* testFunc(action) {
  yield delay(1000);
  yield put({ type: 'TEST_SAGA_SUCCESS', payload: action });
}

export function* test() {
  yield takeEvery('TEST_SAGA', testFunc);
}

export default function* rootSaga() {
  yield all([fork(test)]);
}
