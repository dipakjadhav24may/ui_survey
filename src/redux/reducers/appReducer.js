import {
  LOGOUT_ACTION,
  LOGIN_RESPONSE_SUCCESS,
  LOGIN_RESPONSE_FAILURE
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  loggedInUser: null,
  response: null,
  userToken: null
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACTION: {
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
        response: null
      };
    }
    case LOGIN_RESPONSE_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload.token,
        loggedInUser: action.payload.userData,
        response: null
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
