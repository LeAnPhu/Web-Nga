import { LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false, // Thêm isAuthenticated
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.admin, // user có chứa role
        token: action.payload.token,
        isAuthenticated: true, // Đặt isAuthenticated thành true khi đăng nhập
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false, // Khi logout thì đặt false
      };
    default:
      return state;
  }
};

export default authReducer

