import { combineReducers } from 'redux';
import GeneralReducer from './GeneralReducer';
import AuthReducer from './AuthReducer';
import UsersReducer from './UsersReducer';
import { calendarFormat } from 'moment';



const AppReducers = combineReducers({
  GeneralReducer,
  AuthReducer,
  UsersReducer,
});

const Reducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return AppReducers(undefined, action);
  }
  return AppReducers(state, action);
};

export default Reducer;
