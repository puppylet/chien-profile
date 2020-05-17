import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import test from './test';
import profile from './profile';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    test,
    profile
  });

export default createRootReducer;
