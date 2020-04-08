import {put, takeEvery} from 'redux-saga/effects';
import createState from './state';
import {passData} from './common';
import {declareObject, TArray, TBool} from 'Lib/Core/prop_types';
import dataStatus, {TDataStatus} from 'Logic/redux/data_status';

export const TGameReport = declareObject({
  status: TDataStatus,
  texts: TArray,
  isShow: TBool,
});

export default createState(
  'gameReport',
  {
    status: dataStatus.INIT,
    texts: [],
    isShow: false,
  },
  ({addSaga, reduce, reduceError, reduceReset}) => {
    addSaga(function* () {
      yield takeEvery('RECORD_GAME_REPORT', function* (action) {
        yield put(passData('RECORD_GAME_REPORT_R', {text: action.data.text}));
      });
    });

    addSaga(function* () {
      yield takeEvery('SHOW_GAME_REPORT', function* (action) {
        yield put(passData('SHOW_GAME_REPORT_R', {}));
      });
    });

    reduce('RECORD_GAME_REPORT_R', function (state, action) {
      let data = Object.assign({}, state);
      if (action.text === 'REPORT') {
        data.status = dataStatus.SUCCESS;
      }
      data.texts.push(action.text);
      return data;
    });

    reduce('SHOW_GAME_REPORT_R', function (state, action) {
      let data = Object.assign({}, state);
      data.status = dataStatus.SUCCESS;
      data.isShow = true;
      return data;
    });

    reduceReset('RECORD_GAME_REPORT_RESET');
  }
);

export const gameReport = {
  record: (data) => ({type: 'RECORD_GAME_REPORT', data}),
  show: () => ({type: 'SHOW_GAME_REPORT'}),
  reset: () => ({type: 'RECORD_GAME_REPORT_RESET'}),
};
