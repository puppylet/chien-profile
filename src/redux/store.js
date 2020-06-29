import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers'
const middleWares = [];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleWares.push(logger);
}
export default createStore(reducers, applyMiddleware(...middleWares))
