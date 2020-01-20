import {
  SET_UNAUTHENTICATED,
  GET_ORGANISATIONS,
  CREATE_ORGANISATION,
  GET_ORGANISATION,
  CREATE_GROUP,
  GET_GROUPS,
  SAVE_SURVEY,
  GET_ALL_SURVEYS,
  RESET_SURVEY
} from "../types";

const initialState = {
  organisations: [],
  organisation: {
    groups: [],
    users: []
  },
  surveys: [],
  surveyData: {}
};

export default (state = initialState, action) => {
  console.log("TCL: action", action);
  switch (action.type) {
    case SET_UNAUTHENTICATED:
      return initialState;
    case GET_ORGANISATIONS:
      return {
        ...state,
        organisations: action.payload
      };
    case GET_ORGANISATION:
      return {
        ...state,
        organisation: {
          ...state.organisation,
          ...action.payload
        }
      };
    case CREATE_ORGANISATION: {
      const newOrganisations = [...state.organisations, action.payload];
      return {
        ...state,
        organisations: newOrganisations
      };
    }
    case CREATE_GROUP: {
      const newGroups = [...state.organisation.groups, action.payload];
      return {
        ...state,
        organisation: {
          ...state.organisation,
          groups: newGroups
        }
      };
    }
    case SAVE_SURVEY:
      return {
        ...state,
        surveyData: {
          ...state.surveyData,
          ...action.payload
        }
      };
    case RESET_SURVEY:
      return {
        ...state,
        surveyData: {}
      };
    case GET_ALL_SURVEYS:
      return {
        ...state,
        surveys: action.payload
      };
    case GET_GROUPS: {
      return {
        ...state,
        organisation: {
          ...state.organisation,
          groups: action.payload
        }
      };
    }
    default:
      return state;
  }
};
