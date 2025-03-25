import axios from "../../api/axiosInstance";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/login", { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, // Chứa token và role
    });

    localStorage.setItem("token", res.data.token);
    return res.data.admin; // Phải return role
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data.message : "Lỗi không xác định",
    });
    return null;
  }
};
