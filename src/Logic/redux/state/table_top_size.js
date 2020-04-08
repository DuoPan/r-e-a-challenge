import {put, takeEvery} from 'redux-saga/effects';
import createState from './state';
import {passData} from './common';
import {declareObject, TArray} from 'Lib/Core/prop_types';
import dataStatus, {TDataStatus} from 'Logic/redux/data_status';

export const TTableTopSize = declareObject({
  status: TDataStatus,
  safeToNorth: TArray,
  safeToSouth: TArray,
  safeToWest: TArray,
  safeToEast: TArray,
});

export default createState(
  'tableTopSize',
  {
    status: dataStatus.INIT,
    safeToNorth: [],
    safeToSouth: [],
    safeToWest: [],
    safeToEast: [],
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
      // initial, allow all location to move to all directions
      for (let i = 0; i < action.rows; ++ i) {
        for (let j = 0; j < action.columns; ++ j) {
          // top row cannot move to north
          if (i !== action.rows - 1) {
            data.safeToNorth.push({x: i, y: j});
          }
          // bottom row cannot move to south
          if (i !== 0) {
            data.safeToSouth.push({x: i, y: j});
          }
          // left column cannot move to west
          if (j !== 0) {
            data.safeToWest.push({x: i, y: j});
          }
          // right column cannot move to east
          if (j !== action.columns - 1) {
            data.safeToEast.push({x: i, y: j});
          }
        }
      }
      return data;
    });

    reduceReset('SET_TABLE_TOP_SIZE_RESET');
  }
);

export const tableTopSize = {
  set: (data) => ({type: 'SET_TABLE_TOP_SIZE', data}),
  reset: () => ({type: 'SET_TABLE_TOP_SIZE_RESET'}),
};
