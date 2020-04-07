import createState from './state';
import {declareObject, TBool, TObject} from 'Lib/Core/prop_types';

export const TConnectionError = declareObject({
  on: TBool.isRequired,
  error: TObject,
});

export default createState(
  'connectionError',
  {
    on: false,
    error: null,
  },
  ({reduce}) => {
    reduce('CONNECTION_ERROR_ON', function (state, action) {
      let data = Object.assign({}, state);
      data.on = true;
      data.error = action.e;
      return data;
    });

    reduce('CONNECTION_ERROR_OFF', function (state, action) {
      let data = Object.assign({}, state);
      data.on = false;
      data.error = null;
      return data;
    });
  }
);

export const connectionError = {
  show: e => {
    console.error(e);
    return ({type: 'CONNECTION_ERROR_ON', e});
  },
  hide: () => ({type: 'CONNECTION_ERROR_OFF'}),
};
