import {put, takeEvery} from 'redux-saga/effects';
import createState from './state';
import {passData} from './common';
import gameStatus from 'Logic/const/gameStatus';
// import faceDirections from 'Logic/const/faceDirections';
import {declareObject, TNumber} from 'Lib/Core/prop_types';

export const TGameProgress = declareObject({
  status: TNumber,
  x: TNumber,
  y: TNumber,
  face: TNumber,
});

export default createState(
  'gameProgress',
  {
    status: gameStatus.INIT,
    x: -1,
    y: -1,
    face: -1,
  },
  ({addSaga, reduce, reduceError, reduceReset}) => {
    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_START', function* (action) {
        yield put(passData('GAME_PROGRESS_START_R', {}));
      });
    });

    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_LOCATION', function* (action) {
        yield put(passData('GAME_PROGRESS_LOCATION_R', {x: action.data.x, y: action.data.y}));
      });
    });

    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_FACE', function* (action) {
        yield put(passData('GAME_PROGRESS_FACE_R', {face: action.data.face}));
      });
    });

    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_MOVE', function* (action) {
        yield put(passData('GAME_PROGRESS_MOVE_R', {x: action.data.x, y: action.data.y}));
      });
    });

    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_LEFT', function* (action) {
        yield put(passData('GAME_PROGRESS_LEFT_R', {}));
      });
    });

    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_RIGHT', function* (action) {
        yield put(passData('GAME_PROGRESS_RIGHT_R', {}));
      });
    });

    addSaga(function* () {
      yield takeEvery('GAME_PROGRESS_FINISH', function* (action) {
        yield put(passData('GAME_PROGRESS_FINISH_R', {}));
      });
    });

    reduce('GAME_PROGRESS_START_R', function (state, action) {
      let data = Object.assign({}, state);
      data.status = gameStatus.CHOOSE_LOCATION;
      return data;
    });

    reduce('GAME_PROGRESS_LOCATION_R', function (state, action) {
      let data = Object.assign({}, state);
      data.status = gameStatus.CHOOSE_FACE;
      data.x = action.x;
      data.y = action.y;
      return data;
    });

    reduce('GAME_PROGRESS_FACE_R', function (state, action) {
      let data = Object.assign({}, state);
      data.status = gameStatus.RUNNING;
      data.face = action.face;
      return data;
    });

    reduce('GAME_PROGRESS_MOVE_R', function (state, action) {
      let data = Object.assign({}, state);
      data.x = action.x;
      data.y = action.y;
      return data;
    });

    reduce('GAME_PROGRESS_LEFT_R', function (state, action) {
      let data = Object.assign({}, state);
      data.face = (data.face + 3) % 4;
      if (data.face === 0) {
        data.face = 4;
      }
      return data;
    });

    reduce('GAME_PROGRESS_RIGHT_R', function (state, action) {
      let data = Object.assign({}, state);
      data.face = (data.face + 1) % 4;
      if (data.face === 0) {
        data.face = 4;
      }
      return data;
    });

    reduce('GAME_PROGRESS_FINISH_R', function (state, action) {
      let data = Object.assign({}, state);
      data.status = gameStatus.FINISH;
      return data;
    });

    reduceReset('GAME_PROGRESS_RESET');
  }
);

export const gameProgress = {
  start: () => ({type: 'GAME_PROGRESS_START'}),
  selectLocation: (data) => ({type: 'GAME_PROGRESS_LOCATION', data}),
  selectFace: (data) => ({type: 'GAME_PROGRESS_FACE', data}),
  move: (data) => ({type: 'GAME_PROGRESS_MOVE', data}),
  left: () => ({type: 'GAME_PROGRESS_LEFT'}),
  right: () => ({type: 'GAME_PROGRESS_RIGHT'}),
  over: () => ({type: 'GAME_PROGRESS_FINISH'}),
  reset: () => ({type: 'GAME_PROGRESS_RESET'}),
};
