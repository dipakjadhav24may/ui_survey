import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  GET_ORGANISATIONS,
  CREATE_ORGANISATION,
  GET_GROUPS,
  GET_ORGANISATION,
  CREATE_GROUP,
  SAVE_SURVEY,
  GET_ALL_SURVEYS,
  RESET_SURVEY,
  CREATE_ORG_USER,
  GET_ORG_USERS
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

export const getOrgGroupsAction = (orgId, token) => dispatch => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
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

export const createSurveyAction = (data, token, history) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });

  axios
    .post(`${BASE_URL}organization/survey`, data)
    .then(response => {
      console.log("TCL: response", response);
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/app/dashboard");
    })
    .catch(error => {
      console.log("TCL: error", error.response);
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};

export const getSurveysAction = token => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });

  axios
    .get(`${BASE_URL}organization/surveylist`)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_ALL_SURVEYS,
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

export const saveSurveyDataToStoreAction = surveyData => dispatch => {
  dispatch({ type: SAVE_SURVEY, payload: surveyData });
};

export const resetSurveyDataToStoreAction = () => dispatch => {
  dispatch({ type: RESET_SURVEY });
};


export const createOrgUserAction = (data, userToken) => dispatch => {
  //Code for Api call here
  axios.defaults.headers.common["Authorization"] = userToken;
  dispatch({ type: LOADING_UI });

  axios
    .post(BASE_URL + "organization/user", data)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: CREATE_ORG_USER,
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

export const getOrgUserAction = (orgId,groupId, token) => dispatch => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}organization/orgusers/${orgId}/${groupId}`)
    .then(response => {
      console.log("TCL: response", response);
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_ORG_USERS,
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