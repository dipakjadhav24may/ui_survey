import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  GET_ORGANISATIONS,
  CREATE_ORGANISATION,
  GET_GROUPS,
  GET_ORGANISATION,
  CREATE_GROUP
} from "../types";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

export const getOrgListAction = (userId, token) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}organization/orglist/${userId}`)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_ORGANISATIONS,
        payload: response.data
      });
    })
    .catch(error => {
      console.log("TCL: error", error.response);
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};

export const createOrgAction = (data, userToken) => dispatch => {
  //Code for Api call here
  axios.defaults.headers.common["Authorization"] = userToken;
  dispatch({ type: LOADING_UI });

  axios
    .post(BASE_URL + "organization/org", data)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: CREATE_ORGANISATION,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};

export const getSingleOrgAction = (orgId, token) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}organization/org/${orgId}`)
    .then(response => {
      dispatch({
        type: GET_ORGANISATION,
        payload: response.data
      });
      dispatch(getOrgGroupsAction(orgId));
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};

export const createGroupAction = (data, userToken) => dispatch => {
  //Code for Api call here
  axios.defaults.headers.common["Authorization"] = userToken;
  dispatch({ type: LOADING_UI });

  axios
    .post(BASE_URL + "organization/group", data)
    .then(response => {
      console.log("TCL: response", response);
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: CREATE_GROUP,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};

export const getOrgGroupsAction = orgId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}organization/orggrp/${orgId}`)
    .then(response => {
      console.log("TCL: response", response);
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_GROUPS,
        payload: response.data
      });
    })
    .catch(error => {
      console.log("TCL: error", error.response);
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};
