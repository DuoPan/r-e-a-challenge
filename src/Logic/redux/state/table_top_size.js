import {put, takeEvery} from 'redux-saga/effects';
import createState from './state';
import {passData} from './common';
import {declareObject, TNumber} from 'Lib/Core/prop_types';
import dataStatus, {TDataStatus} from 'Logic/redux/data_status';

export const TTableTopSize = declareObject({
  status: TDataStatus,
  rows: TNumber,
  columns: TNumber,
});

export default createState(
  'tableTopSize',
  {
    status: dataStatus.INIT,
    rows: -1,
    columns: -1,
  },
  ({addSaga, reduce, reduceError, reduceReset}) => {
    addSaga(function* () {
      yield takeEvery('SET_TABLE_TOP_SIZE', function* (action) {
        yield put(passData('SET_TABLE_TOP_SIZE_R', {rows: action.data.rows, columns: action.data.columns}));
      });
    });

    reduce('SET_TABLE_TOP_SIZE_R', function (state, action) {
      let data = Object.assign({}, state);
      data.status = dataStatus.SUCCESS;
      data.rows = action.rows;
      data.columns = action.columns;
      return data;
    });

    reduceReset('SET_TABLE_TOP_SIZE_RESET');
  }
);

export const tableTopSize = {
  set: (data) => ({type: 'SET_TABLE_TOP_SIZE', data}),
  reset: () => ({type: 'SET_TABLE_TOP_SIZE_RESET'}),
};
