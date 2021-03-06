//@ Loading Modules
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./Reducer/index";

const middleware = [thunk];
const initailState = {};
//@ Creating store
const store = createStore(
  RootReducer,
  initailState,
  compose(applyMiddleware(...middleware))
);

//@ exporting store
export default store;
