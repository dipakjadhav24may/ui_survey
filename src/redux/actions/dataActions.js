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
  GET_SINSLE_SURVEY,
  GET_SINSLE_GROUP,
  CREATE_ORG_USER,
  GET_ORG_USERS,
  GET_ORG_USER_ASSESSMENTS
} from "../types";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

import { getSurvey } from "../../firebase";

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
        data: { groups: [] },
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
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({ type: RESET_SURVEY });
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

export const updateSurveyAction = (
  surveyId,
  data,
  token,
  history
) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });

  axios
    .put(`${BASE_URL}organization/survey/${surveyId}`, data)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({ type: RESET_SURVEY });
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

export const getSurveysAction = (userId, token) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });

  axios
    .get(`${BASE_URL}organization/survey/user/${userId}`)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_ALL_SURVEYS,
        payload: response.data
      });
      dispatch(getOrgListAction(userId, token));
    })
    .catch(error => {
      console.log("TCL: error", error.response);
      dispatch({
        type: SET_ERRORS,
        payload: error.response ? error.response.data : null
      });
    });
};

export const getSingleSurveyAction = (surveyId, token) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });

  axios
    .get(`${BASE_URL}organization/survey/${surveyId}`)
    .then(response_survey => {
      getSurvey(response_survey.data.firebaseSurveyId).then(snapshot => {
        if (snapshot.exists) {
          let surveyData = {
            surveyName: snapshot.val().title,
            surveyId: response_survey.data.surveyId,
            surveyFirebaseId: snapshot.key,
            surveyText: snapshot.val()
          };
          dispatch({
            type: GET_SINSLE_SURVEY,
            payload: surveyData
          });
        }
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

export const getSingleGroupAction = (groupId, token) => dispatch => {
  axios.defaults.headers.common["Authorization"] = token;
  dispatch({ type: LOADING_UI });

  axios
    .get(`${BASE_URL}organization/group/${groupId}`)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_SINSLE_GROUP,
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

export const getOrgUserAction = (orgId, groupId, token) => dispatch => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}organization/orgusers/${orgId}/${groupId}`)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_ORG_USERS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        data: { users: [] },
        payload: error.response ? error.response.data : null
      });
    });
};

export const getOrgUserAssessmentsAction = (userId, token) => dispatch => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
  dispatch({ type: LOADING_UI });
  axios
    .get(`${BASE_URL}organization/assessment/user/${userId}`)
    .then(response => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: GET_ORG_USER_ASSESSMENTS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        data: { assessments: [] },
        payload: error.response ? error.response.data : null
      });
    });
};
