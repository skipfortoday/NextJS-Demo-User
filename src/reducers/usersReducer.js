import { GET_USERS_LIST, GET_USER_DETAIL, POST_USER_ADD } from "../constants";

let initialState = {
  getUsersList: false,
  errorUsersList: false,
  getUserDetail: false,
  errorUserDetail: false,
  postUserAdd: false,
  erroUserAdd: false,
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
        erroUserDetail: action.payload.errorMessage,
      };
    case POST_USER_ADD:
      return {
        ...state,
        postUserAdd: action.payload.data,
        erroUserAdd: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default users;
