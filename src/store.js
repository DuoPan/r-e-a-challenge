import {applyMiddleware, compose, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {getReducers, getRootSaga} from './Logic/redux';

// Add history.
let history = createBrowserHistory();

export function getHistory() {
  return history;
}

const rootReducer = (state, action) => {
  return combineReducers({
    router: connectRouter(history),
    ...getReducers(),
  })({...state}, action);
};

// Add saga.
const sagaMiddleware = createSagaMiddleware();

// Create the store.
export default createStore(
  rootReducer, // root reducer with router state
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware,
    ),
  ),
);

// Run the saga.
sagaMiddleware.run(getRootSaga());