import { applyMiddleware, createStore } from "redux";
import Reducers from "./Reducers";
import { thunk } from "redux-thunk";

const Store = createStore(Reducers, applyMiddleware(thunk));

Store.subscribe(() => {
  // console.log('Store updated', Store.getState());
});
export default Store;
