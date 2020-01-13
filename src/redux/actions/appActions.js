import {
  LOGOUT_ACTION,
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_FAILURE,
  SIGNUP,
  CHNAGE_SUCCESSFUL_CREATION
} from "./types";
import axios from "axios";

import { BASE_URL } from "../../utils/config";

export const loginAction = data => {
  return async dispatch => {
    //Code for Api call here

    const config = {
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': `bearer ${userToken}`
      }
    };

    axios
      .post(BASE_URL + "token/generate-token", data, config)
      .then(function(response) {
        console.log("TCL: response", response.data.token);
        dispatch({
          type: LOGIN_RESPONSE_SUCCESS,
          payload: response.data.token
        });
      })
      .catch(function(error) {
        console.log(error.response.data);
        if (error.response.status === 401) {
          console.log(error.response.status);
          dispatch({
            type: LOGIN_RESPONSE_FAILURE,
            payload: {
              ...error.response.data,
              message: "Wrong credentials, please try again"
            }
          });
        }
      });
  };
};
export const signupAction = data => {
  console.log("TCL: data", data);
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .post(BASE_URL + "token/signup", data, config)
      .then(function(response) {
        console.log("TCL: response", response);
        dispatch({
          type: SIGNUP,
          payload: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const logoutAction = () => {
  return async dispatch => {
    dispatch({
      type: LOGOUT_ACTION,
      payload: "clear redux data"
    });
  };
};

export const changeSuccessfulCreation = () => {
  return async dispatch => {
    dispatch({
      type: CHNAGE_SUCCESSFUL_CREATION,
      payload: "clear redux data"
    });
  };
};
