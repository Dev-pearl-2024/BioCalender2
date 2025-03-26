import ActionTypes from '../Actions/ActionTypes';

let initialState = {
  getMySubscription: [],
  getSubscriptions: [],
  getCards: [],
  subscribed: true,
  getAdverts: [],
  faq: null,
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FAQ:
      state = {...state, faq: action.payload};
      break;
    case ActionTypes.GET_SUBSCRIPTIONS:
      state = {...state, getSubscriptions: action.payload};
      break;
    case ActionTypes.GET_CARDS:
      state = {...state, getCards: action.payload};
      break;
    case ActionTypes.STORE_CARD:
      state = {...state, getCards: [...state.getCards, action?.payload]};
      break;
    case ActionTypes.DELETE_CARD:
      state = {
        ...state,
        getCards: state.getCards.filter(
          item => item?.id != action?.payload?.id,
        ),
      };
      break;
  }
  return state;
};

export default UsersReducer;
