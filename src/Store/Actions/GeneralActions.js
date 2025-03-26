import ActionTypes from './ActionTypes';

const showAlert = payload => {
  return {
    type: ActionTypes.SHOW_ALERT,
    payload,
  };
};

const hideAlert = () => {
  return {
    type: ActionTypes.HIDE_ALERT,
  };
};


const showLoading = () => {
  return {
    type: ActionTypes.SHOW_LOADING,
  };
};

const hideLoading = () => {
  return {
    type: ActionTypes.HIDE_LOADING,
  };
};
const showProgress = payload => {
  return {
    type: ActionTypes.showProgress,
    payload,
  };
};

const hideProgress = () => {
  return {
    type: ActionTypes.hideProgress,
  };
};

const getPages = payload => {
  return {
    type: ActionTypes.GET_PAGES,
    payload,
  };
};

export {
  showLoading,
  hideLoading,
  showAlert,
  hideAlert,
  showProgress,
  hideProgress,
  getPages,

};
