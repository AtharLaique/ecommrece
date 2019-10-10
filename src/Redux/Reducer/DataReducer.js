//@ intal state for this reducer
const initialState = { isData: false,data:[]};
//defination of reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_DATA_DISPATC':
      return {
        ...state,
        isData:action.flag,
        data: action.payload//action.payload is data that  send form login action 
      };
    default:
      return state;
  }
}

