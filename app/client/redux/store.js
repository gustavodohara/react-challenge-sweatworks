import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '.'
import promise from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

const defaultMiddlewares = [
  thunkMiddleware,
  promise
];

const composeMiddlewares = middlewares => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for redux dev tools
  return composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares));
};


const initialize = (initialState, middlewares = []) => createStore(
  reducer,
  initialState,
  composeMiddlewares(middlewares)
);

export default initialize;
