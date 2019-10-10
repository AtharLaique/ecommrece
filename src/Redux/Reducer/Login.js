import {LOGIN_DISPATCH, ERROR_DISPATCH} from "../../Redux/Actions/type";
//@ intal state for this reducer
const initialState = { isLogin: false ,error:null};
//defination of reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_DISPATCH:
      return {
        ...state,
        isLogin: action.payload//action.payload is data that  send form login action 
      };
      case ERROR_DISPATCH:
      return{
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
