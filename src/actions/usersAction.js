import axios from "axios";
import { GET_USERS_LIST, GET_USER_DETAIL } from "../constants";
import conf from "../config";

export const getUsersList = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/users`)
      .then(function (response) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};

export const getUserDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/users/]${id}`)
      .then(function (response) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USER_DETAIL,
          payload: {
            data: false,
            errorMessage: error,
          },
        });
      });
  };
};
