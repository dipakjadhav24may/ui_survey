import {
  LOGOUT_ACTION,
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_FAILURE,
  CREATE_ORGANISATION,
  GET_ORGANISATION_LIST
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  loggedInUser: null,
  response: null,
  userToken: null,
  organisations: []
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACTION: {
      return {
        ...state,
        ...initialState
      };
    }
    case LOGIN_RESPONSE_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload.token.token,
        loggedInUser: action.payload.user,
        response: null
      };
    }
    case CREATE_ORGANISATION: {
      const newOrganisations = [...state.organisations, action.payload];
      return {
        ...state,
        organisations: newOrganisations
      };
    }
    case GET_ORGANISATION_LIST: {
      return {
        ...state,
        organisations: action.payload
      };
    }
    case LOGIN_RESPONSE_FAILURE: {
      return {
        ...state,
        response: action.payload
      };
    }
    default:
      return state;
  }
}
