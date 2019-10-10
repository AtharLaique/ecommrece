import axios from "axios";
import url from "../../config/Url";
import { async } from "q";
export const Data = (index, flag) => dispatch => {
  //Perform Action and update state by calling dispatch

  if (!flag) {
    console.log("false");
    axios.get(url.PageData + index).then(res => {
      dispatch({
        type: "LOAD_DATA_DISPATC",
        payload: res.data,
        flag: true
      });
    });
  }
};
