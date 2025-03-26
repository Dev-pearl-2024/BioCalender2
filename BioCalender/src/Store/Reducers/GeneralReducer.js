import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  showAlert: false,
  isSubscription: false,
  alertOptions: null,
  loading: false,
  showProgress: false,
  progressValue: null,
  pages: null,
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ALERT:
      state = {...state, showAlert: true, alertOptions: action.payload};
      break;

    case ActionTypes.HIDE_ALERT:
      state = {...state, showAlert: false, alertOptions: null};
      break;

    case ActionTypes.SHOW_LOADING:
      state = {...state, loading: true};
      break;

    case ActionTypes.HIDE_LOADING:
      state = {...state, loading: false};
      break;
    case ActionTypes.showProgress:
      state = {...state, showProgress: true, progressValue: action.payload};
      break;

    case ActionTypes.hideProgress:
      state = {...state, showProgress: false, progressValue: null};
      break;

    case ActionTypes.GET_PAGES:
      state = {...state, pages: action.payload};
      break;

  
    default:
      break;
  }
  return state;
};

export default GeneralReducer;
