import { LOGOUT_ACTION, LOGIN_RESPONSE_SUCCESS } from "../actions/types";

const initialState = {
  isLoggedIn: null,
  loggedInUser: null
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_ACTION: {
      return {
        ...state,
        isLoggedIn: null,
        loggedInUser: null
      };
    }
    case LOGIN_RESPONSE_SUCCESS: {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        loggedInUser: action.payload.loggedInUser
      };
    }
    default:
      return state;
  }
}
