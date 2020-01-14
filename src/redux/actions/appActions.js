import {
  LOGOUT_ACTION,
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_FAILURE,
  CREATE_ORGANISATION,
  GET_ORGANISATION_LIST
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
        console.log("TCL: response", response.data);
        dispatch({
          type: LOGIN_RESPONSE_SUCCESS,
          payload: response.data
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
export const createOrgAction = (data, userToken) => {
  return async dispatch => {
    //Code for Api call here

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`
      }
    };

    axios
      .post(BASE_URL + "organization/org", data, config)
      .then(response => {
        console.log("TCL: response", response.data);
        dispatch({
          type: CREATE_ORGANISATION,
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};
export const getOrgListAction = userToken => {
  return async dispatch => {
    //Code for Api call here

    const config = {
      headers: {
        Authorization: `bearer ${userToken}`
      }
    };

    axios
      .get(BASE_URL + "organization/orglist", config)
      .then(response => {
        console.log("TCL: response", response.data);
        dispatch({
          type: GET_ORGANISATION_LIST,
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error.response);
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
