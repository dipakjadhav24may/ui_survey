import {
  SET_UNAUTHENTICATED,
  GET_ORGANISATIONS,
  CREATE_ORGANISATION,
  GET_ORGANISATION,
  CREATE_GROUP,
  GET_GROUPS
} from "../types";

const initialState = {
  organisations: [],
  organisation: {
    groups: [],
    users: []
  }
};

export default (state = initialState, action) => {
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
