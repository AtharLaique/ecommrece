import axios from "axios";
import url from "../../config/Url";
import {CART_COUNT_DISPATCH} from "./type";

export  const CartCount = () => dispatch => {
  console.log('Its a cart count action')
  console.log(url.CartCountByID+localStorage.getItem('id'))
  axios.get(url.CartCountByID+localStorage.getItem('id')).then(function(res, err) {
      console.log(res.data)
    if (res.status == "200") {
      dispatch({
        type: CART_COUNT_DISPATCH,
        payload: res.data
      });
    }
  });
};
