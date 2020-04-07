import createState from './state';
import {declareObject, TArray} from 'Lib/Core/prop_types';
import arrayAddElement from 'Utils/arrayAddElement';
import arrayRemoveElement from 'Utils/arrayRemoveElement';

export const TLoadingTransition = declareObject({
  on: TArray.isRequired,
});

export const globalFlag = '__all__';

export default createState(
  'loadingTransition',
  {
    on: [],
  },
  ({addSaga, reduce}) => {
    reduce('LOADING_TRANSITION_ON', function (state, action) {
      let data = Object.assign({}, state);
      // console.log('on start');
      // console.log(data.on);
      if (!data.on.includes(globalFlag)) {
        arrayAddElement(data.on, globalFlag);
      }
      if (action.componentId && !data.on.includes(action.componentId)) {
        arrayAddElement(data.on, action.componentId);
      }
      // console.log('on return');
      // console.log(data.on);
      return data;
    });
    reduce('LOADING_TRANSITION_OFF', function (state, action) {
      // console.log('current state');
      // console.log(state);
      let data = Object.assign({}, state);
      // console.log('off start');
      // console.log(data.on);
      if (action.componentId) {
        arrayRemoveElement(data.on, action.componentId);
      }
      if (data.on.length === 1) {
        data.on = [];
      }
      // console.log('off return');
      // console.log(data.on);
      return data;
    });
  }
);

export const loadingTransition = {
  show: () => ({type: 'LOADING_TRANSITION_ON'}),
  hide: () => ({type: 'LOADING_TRANSITION_OFF'}),
};
