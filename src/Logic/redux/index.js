import {fork, all} from 'redux-saga/effects';
import states from './state';
import dataStatus from './data_status';

const _forkSagas = [];
const _reducers = {};

states.forEach(([stateName, stateSagas, stateReducer]) => {
  stateSagas.forEach((saga) => {
    _forkSagas.push(fork(saga));
  });
  _reducers[stateName] = stateReducer;
});

export function getRootSaga() {
  return function* () {
    yield all(_forkSagas);
  }
}

export function getReducers() {
  return _reducers;
}

export {
  dataStatus,
};