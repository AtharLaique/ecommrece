//@ intal state for this reducer
const initialState = { count: 0 };
//defination of reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case "CART_DISPATCH":
      return {
        ...state,
        count: action.payload //action.payload is data that  send form login action
      };
    case "CART_COUNT_DISPATCH":
      return {
        ...state,
        count: action.payload //action.payload is data that  send form login action
      };
    default:
      return state;
  }
}
