import {declareValues} from 'Lib/Core/prop_types';

const dataStatus = {
  FAILURE: 0,
  SUCCESS: 1,
  INTERNAL_SERVER_ERROR: 5,
  INIT: 1001,
};

let dataStatusValues = [];
for (let key in dataStatus) {
  dataStatusValues.push(dataStatus[key]);
}

const TDataStatus = declareValues(dataStatusValues);

export default dataStatus;

export {
  TDataStatus,
}
