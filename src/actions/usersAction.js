import axios from "axios";
import { GET_USERS_LIST, GET_USER_DETAIL, POST_USER_ADD } from "../constants";
import conf from "../config";

export const getUsersList = () => {
  return (dispatch) => {
    axios
      .get(`${conf.baseURL}/api/users`)
      .then(function (response) {
        let array = [];
        for (var key in response.data.data) {
          array.push(response.data.data[key]);
        }
        dispatch({
          type: GET_USERS_LIST,
          payload: {
            data: array,
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

export const postUserAdd = (data) => {
  console.log(data);
  return (dispatch) => {
    axios
      .post(`${conf.baseURL}/api/users`, data)
      .then(function (response) {
        dispatch({
          type: POST_USER_ADD,
          payload: {
            data: response.data.message,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: POST_USER_ADD,
          payload: {
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
