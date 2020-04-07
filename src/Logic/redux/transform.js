import dataStatus from './data_status';

function transformApiData(data) {
  let mappedData = {};

  // Map the returned json object from api api.
  if (data.hasOwnProperty('data')) {
    mappedData.data = data.data;
  }
  return mappedData;
}

function transformActionError(initData, data) {
  return Object.assign(initData, {
    error: [data.e],
  });
}

export {
  dataStatus,
  transformApiData,
  transformActionError,
}