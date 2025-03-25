import { LOGIN_SUCCESS, LOGOUT } from "../types";

export const loginSuccess = (user, token, role) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token, role },
});

export const logout = () => ({
  type: LOGOUT,
});
