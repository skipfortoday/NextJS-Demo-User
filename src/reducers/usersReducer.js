import {
  DELETE_USER,
  GET_USERS_LIST,
  GET_USER_DETAIL,
  POST_USER_ADD,
  PUT_USER_EDIT,
} from "../constants";

let initialState = {
  getUsersList: false,
  errorUsersList: false,
  getUserDetail: false,
  errorUserDetail: false,
  postUserAdd: false,
  erroUserAdd: false,
  putUserEdit: false,
  errorUserEdit: false,
  deleteUser: false,
  errorUserDelete: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_LIST:
      return {
        ...state,
        getUsersList: action.payload.data,
        errorUsersList: action.payload.errorMessage,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        getUserDetail: action.payload.data,
        errorUserDetail: action.payload.errorMessage,
      };
    case POST_USER_ADD:
      return {
        ...state,
        postUserAdd: action.payload.data,
        errorUserAdd: action.payload.errorMessage,
      };
    case PUT_USER_EDIT:
      return {
        ...state,
        putUserEdit: action.payload.data,
        errorUserEdit: action.payload.errorMessage,
      };
    case DELETE_USER:
      return {
        ...state,
        deleteUser: action.payload.data,
        errorUserDelete: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default users;
