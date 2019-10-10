import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import cartReducer from "./cartReducer";
import cartCountReducer from "./cartReducer"
import DataReducer from "./DataReducer"

export default combineReducers({
  login: loginReducer,
  cart:cartReducer,
  count:cartCountReducer,
  data:DataReducer
});
