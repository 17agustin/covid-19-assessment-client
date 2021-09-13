import {
  GET_ALL_STATISTICS,
  LOGIN,
  DETAIL,
  SEARCH_QUERY,
  SYNC,
  LOGOUT,
  CLEAR_STATISTICS,
} from "../actions/index";

const initialState = {
  statistics: [],
  loggedUser: {},
  detail: null,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_STATISTICS:
      return {
        ...state,
        statistics: payload,
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
        statistics: payload,
      };
    case SYNC:
      return {
        ...state,
        statistics: payload,
      };
    case DETAIL:
      return {
        ...state,
        detail: payload,
      };
    case CLEAR_STATISTICS:
      return {
        ...state,
        statistics: payload,
      };
    default:
      return state;
  }
}
