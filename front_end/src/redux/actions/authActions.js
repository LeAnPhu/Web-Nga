import axios from "../../api/axiosInstance";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

export const login = (email, password) => async (dispatch) => {
  const roles = ["admin", "shop_owner", "user"];

  const loginRequests = roles.map((role) =>
    axios.post(`http://localhost:8000/api/${role}/login`, { email, password })
      .then((response) => ({ role, data: response.data }))
      .catch((error) => ({ role, error }))
  );

  const results = await Promise.allSettled(loginRequests);

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.data) {
      const { token, user } = result.value.data;
      const role = result.value.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      dispatch({ type: LOGIN_SUCCESS, payload: { user, token, role } });

      return { user, token, role };
    }
  }

  dispatch({
    type: LOGIN_FAIL,
    payload: "Sai email hoặc mật khẩu",
  });

  return null;
};
