import {connectionError} from './state/connection_error';
import {loadingTransition} from './state/loading_transition';

const passData = (type, data) => ({...{type}, ...data});
const getApiResponse = (type, data) => {
  return ({type, data});
};
const handleError = (type, e) => {
  return ({type, e});
};
const showLoading = (componentId) => ({type: 'LOADING_TRANSITION_ON', componentId});
const hideLoading = (componentId) => ({type: 'LOADING_TRANSITION_OFF', componentId});

export {
  passData,
  getApiResponse,
  handleError,
  showLoading,
  hideLoading,
  connectionError,
  loadingTransition,
}
