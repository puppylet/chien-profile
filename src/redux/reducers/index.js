import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import test from './test';
import profile from './profile';
import user from './user';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    test,
    profile,
    user
  });

export default createRootReducer;
