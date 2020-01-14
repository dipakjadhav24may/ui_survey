import {
  LOGOUT_ACTION,
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_FAILURE
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
      .then(response => {
        return response.data.token;
      })
      .then(userToken => {
        const configUser = {
          headers: {
            Authorization: `bearer ${userToken}`
          }
        };
        axios
          .get(BASE_URL + "organization/users/" + 3, configUser)
          .then(response => {
            console.log("TCL: response", response);
            dispatch({
              type: LOGIN_RESPONSE_SUCCESS,
              payload: {
                userData: response.data,
                token: userToken
              }
            });
          })
          .catch(error => {
            console.log(error.response.data);
          });
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response.status === 401) {
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

export const logoutAction = () => {
  return async dispatch => {
    dispatch({
      type: LOGOUT_ACTION,
      payload: "clear redux data"
    });
  };
};
