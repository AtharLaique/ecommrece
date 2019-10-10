import {LOGIN_DISPATCH} from '../Actions/type';
import {LOG_DISPATCH} from '../Actions/type';
//@ intal state for this reducer
const  initialState={error:{},loguser:{},log:false}

//defination oof reducer
export default function(state=initialState , action){
        switch(action.type)
        {
            case LOGIN_DISPATCH:
            return{
                ...state ,
                error:action.payload  
            }
            case LOG_DISPATCH:
            return{
                ...state ,
                log:true,
                loguser:action.payload  
            }

            default:
            return state;
        }
}