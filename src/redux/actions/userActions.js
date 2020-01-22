import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED
} from "../types";
import axios from "axios";
import * as ROUTES from "../../utils/routes";
import { BASE_URL } from "../../utils/config";

export const loginUserAction = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(BASE_URL + "token/generate-token", userData)
    .then(response => {
      console.log("TCL: response", response);
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: SET_USER,
        payload: response.data
      });
      history.push(ROUTES.DASHBOARD);
    })
    .catch(error => {
      console.log("TCL: error", error.response);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    });
};

export const logOutAction = history => dispatch => {
  dispatch({
    type: SET_UNAUTHENTICATED
  });
  history.push("/");
};
