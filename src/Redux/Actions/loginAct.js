import axios from "axios";
import { LOGIN_DISPATCH, ERROR_DISPATCH } from "./type";
import url from "../../config/Url";
export const LoginHandling = (Data, history) => dispatch => {
  axios.post(url.AdLogin, Data).then(function(res, err) {
    if (res.status == "200") {
        localStorage.setItem('isLogin',true)
      dispatch({
        type: LOGIN_DISPATCH,
        payload: true
      });
      history.push('/dashboard')
    } else {
    
      dispatch({ type: ERROR_DISPATCH, payload: "Login faild" });
    }
  });
};
