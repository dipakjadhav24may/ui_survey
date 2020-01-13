import {
  LOGOUT_ACTION,
  LOGIN_RESPONSE_SUCCESS,
  SIGNUP,
  CHNAGE_SUCCESSFUL_CREATION,
  LOGIN_RESPONSE_FAILURE
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  loggedInUser: null,
  userCreationSuccessful: false,
  response: null
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
        isLoggedIn: action.payload.isLoggedIn,
        userToken: action.payload,
        userCreationSuccessful: false,
        response: null
      };
    }
    case LOGIN_RESPONSE_FAILURE: {
      return {
        ...state,
        response: action.payload
      };
    }
    case SIGNUP: {
      return {
        ...state,
        userCreationSuccessful: action.payload
      };
    }
    case CHNAGE_SUCCESSFUL_CREATION: {
      return {
        ...state,
        userCreationSuccessful: false
      };
    }
    default:
      return state;
  }
}
