import axios from "axios";
export const GET_ALL_STATISTICS = "GET_ALL_STATISTICS";
export const GET_ALL_COUNTRYS = "GET_ALL_COUNTRYS";
export const UPDATE = "UPDATE";
export const RESET_STATISTICS = "RESET_STATISTICS";
export const SYNC = "RESET_STATISTICS";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGGED_USER = "LOGGED_USER";
export const ORDER = "ORDER";
export const DETAIL = "DETAIL";
export const SEARCH_QUERY = "SEARCH_QUERY";
export const BASE_URL = "http://localhost:3001/api";

const userToken = JSON.parse(localStorage.getItem("user")); 

/* export const axiosFunction = async (param) => {
  const options = {
    method: "GET",
    url: `${BASE_URL}/${param}`,
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWF4aSIsImxhc3RuYW1lIjoiZmVybmFuZGV6IGFyZW5hcyIsImVtYWlsIjoibWFheGlpQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkb1dWMHZpR0pzamVyWVhOMEVnWE91dXNFNnZ5UTBpaWZqL0xnL0lSOFBnTjlUeTh3Tno3SU8iLCJpYXQiOjE2MzEyMDIzMzF9.psf-ca-9iTJ0l9PtV5EHSV6x_vFE-DkqeQCZveTq2Qk",
    },
  };

  const response = await axios.request(options);
  try {
    return response.data.response;
  } catch (error) {
    return console.log(error);
  }
};
 */
export const getStatistic = () => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/statistics`, {
      headers: {
        authorization:
          `${userToken}`,
      },
    });
    dispatch({ type: GET_ALL_STATISTICS, payload: response.data });
  };
};

export const login = (user) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      user
    );
    const userToken = JSON.parse(localStorage.getItem("user"));
    if(!userToken) response && localStorage.setItem("user", JSON.stringify(response.data.token));
    return dispatch({ type: LOGIN, payload: response.data });
  };
};

export const autoLog = (user)=>{
  return (dispatch) =>{
    const userToLog = {
      name:user.name,
      email: user.email
    }
    return dispatch({ type:LOGIN, payload: userToLog })
  }
}


export const logOut = () => {
  return (dispatch) => {
    localStorage.removeItem("user")
    dispatch({type:LOGOUT, payload:null})
  }
}

export const search = async (query) => {
    const response = await axios.get(
      `${BASE_URL}/statistics?query=${query}`,
      {
        headers: {
          authorization:
          `${userToken}`,
        },
      }
    );
    return response.data
  };


export const sync = () => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/sync`, {
      headers: {
        authorization:
        `${userToken}`,
      },
    });
    dispatch({ type: SYNC, payload: response.data });
  };
};



export const detail = (id) =>{
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/statistics/${id}`, {
      headers: {
        authorization:
        `${userToken}`,
      },
    })
    dispatch({type:DETAIL, payload:response.data })
}
}

export const cleanDetail = () =>{
  return (dispatch)=>{
    dispatch({type:DETAIL, payload:null})
  }
}