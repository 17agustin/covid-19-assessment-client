import {
  GET_ALL_STATISTICS,
  LOGIN,
  DETAIL,
  SEARCH_QUERY,
  SYNC,
  LOGOUT,
} from "../actions/index";

const initialState = {
  Statistics: [],
  Countries: [],
  loggedUser: {},
  detail: null,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_STATISTICS:
      return {
        ...state,
        Statistics: payload,
      };
    case LOGIN:
      return {
        ...state,
        loggedUser: payload,
      };
    case LOGOUT:
      return {
        ...state,
        loggedUser: payload,
      };
    case SEARCH_QUERY:
      return {
        ...state,
        Statistics: payload,
      };
    case SYNC:
      return {
        ...state,
        Statistics: payload,
      };
    case DETAIL:
      return {
        ...state,
        detail: payload,
      };
    default:
      return state;
  }
}
