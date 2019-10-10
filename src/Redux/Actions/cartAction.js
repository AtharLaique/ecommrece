//Add new Item into cart
import axios from "axios";
import {CART_DISPATCH} from "./type";
import url from "../../config/Url";

 export const cart=(data )=>dispatch=>{
    
    axios.post(url.AdTocart,data).then(function(res, err) {
      if (res.status == "200") 
      {
        axios.get(url.CartCountByID+localStorage.getItem('id')).then(function(res, err) {
          if (res.status == "200") {
            console.log(res.data)
            dispatch({
              type: 'CART_COUNT_DISPATCH',
              payload: res.data
            });
          }
        });
      }
    });
     
 }
