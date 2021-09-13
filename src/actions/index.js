import axios from "axios";
import {
  BASE_URL,
  CLEAR_STATISTICS,
  DETAIL,
  GET_ALL_STATISTICS,
  LOGIN,
  LOGOUT,
  SEARCH_QUERY,
  SYNC,
} from "../constants/constants";

const userToken = JSON.parse(localStorage.getItem("user"));

export const getStatistic = () => {
  return async (dispatch) => {
    const response = await axios.get(`/statistics`, {
      headers: {
        authorization: `${userToken}`,
      },
    });
    dispatch({ type: GET_ALL_STATISTICS, payload: response.data });
  };
};

export const login = (user) => {
  return async (dispatch) => {
    const response = await axios.post(`/auth/login`, user);
    const userToken = JSON.parse(localStorage.getItem("user"));
    if (!userToken)
      response &&
        localStorage.setItem("user", JSON.stringify(response.data.token));
    return dispatch({ type: LOGIN, payload: response.data });
  };
};

export const autoLog = (user) => {
  return (dispatch) => {
    const userToLog = {
      name: user.name,
      email: user.email,
    };
    return dispatch({ type: LOGIN, payload: userToLog });
  };
};

export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT, payload: null });
  };
};

export const search = (query) => {
  return async (dispatch) => {
    const response = await axios.get(`/statistics?query=${query}`, {
      headers: {
        authorization: `${userToken}`,
      },
    });
    return dispatch({ type: SEARCH_QUERY, payload: response.data });
  };
};

export const sync = () => {
  return async (dispatch) => {
    const response = await axios.get(`/sync`, {
      headers: {
        authorization: `${userToken}`,
      },
    });
    dispatch({ type: SYNC, payload: response.data });
  };
};

export const detail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/statistics/${id}`, {
      headers: {
        authorization: `${userToken}`,
      },
    });
    dispatch({ type: DETAIL, payload: response.data });
  };
};

export const cleanDetail = () => {
  return (dispatch) => {
    dispatch({ type: DETAIL, payload: null });
  };
};

export const updateCountry = (id, country) => {
  return async (dispatch) => {
    const response = await axios.post(`/statistics/${id}`, country, {
      headers: {
        authorization: `${userToken}`,
      },
    });
    dispatch({ type: DETAIL, payload: response.data });
  };
};

export const clearStatistics = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_STATISTICS, payload: null });
  };
};
