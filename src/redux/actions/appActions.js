import { LOGOUT_ACTION, LOGIN_RESPONSE_SUCCESS } from "./types";

export const loginAction = data => {
  return async dispatch => {
    dispatch({
      type: LOGIN_RESPONSE_SUCCESS,
      payload: data
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
