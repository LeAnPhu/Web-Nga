import axios from "../../api/axiosInstance";
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from "../types";

/**
 * Đăng nhập người dùng
 */
export const login = (email, password) => async (dispatch) => {
  const roles = ["admin", "shop_owner", "user"];

  const loginRequests = roles.map((role) =>
    axios
      .post(`http://localhost:8000/api/${role}/login`, { email, password })
      .then((response) => ({ role, data: response.data }))
      .catch((error) => ({ role, error }))
  );
  
  const results = await Promise.allSettled(loginRequests);

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.data) {
      const { token, user } = result.value.data;
      const role = result.value.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Lưu role vào localStorage

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

/**
 * Đăng ký người dùng mới
 */
export const register = (name, email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/api/user/register", {
      name,
      email,
      password,
    });

    const { otp_expired } = response.data;

    // Nếu OTP đã hết hạn
    if (otp_expired) {
      dispatch({
        type: REGISTER_FAIL,
        payload: "Mã OTP đã hết hạn! Vui lòng yêu cầu mã mới.",
      });

      return { otpExpired: true };
    }

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    return response.data;
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || "Lỗi đăng ký",
    });

    return null;
  }
};


/**
 * Yêu cầu gửi lại OTP nếu chưa xác thực email
 */
export const reRegister = (email) => async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/user/re_register", {
      email,
    });

    const { otp_expired } = response.data;

    // Nếu OTP vẫn hết hạn 
    if (otp_expired) {
      return { otpExpired: true, message: "Mã OTP đã hết hạn! Vui lòng thử lại." };
    }

    return response.data; // Trả về OTP mới nếu thành công
  } catch (error) {
    return {
      otpExpired: false,
      message: error.response?.data?.message || "Lỗi gửi lại OTP",
    };
  }
};
