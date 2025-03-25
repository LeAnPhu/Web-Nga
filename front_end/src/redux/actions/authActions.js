import axios from "../../api/axiosInstance";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

export const login = (email, password, role) => async (dispatch) => {
  try {
    let apiUrl = "/admin/login"; // Mặc định cho user

    if (role === "admin") apiUrl = "/admin/login";
    else if (role === "shop_owner") apiUrl = "/shop/login";

    const res = await axios.post(apiUrl, { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, // Chứa token và role
    });

    localStorage.setItem("token", res.data.token);
    return res.data[role]; // Phải return đúng dữ liệu role
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data.message : "Lỗi không xác định",
    });
    return null;
  }
};