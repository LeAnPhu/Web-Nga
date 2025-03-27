import axios from "../../api/axiosInstance";
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,OTP_EXPIRED ,RE_REGISTER_SUCCESS,RE_REGISTER_FAIL} from "../types";

/**
 * Đăng nhập người dùng
 */
export const login = (email, password) => async (dispatch) => {
  const roles = ["user", "shop_owner", "admin"];

  for (const role of roles) {
    try {
      const response = await axios.post(`http://localhost:8000/api/${role}/login`, { email, password });

      if (response.data?.token) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        dispatch({ type: LOGIN_SUCCESS, payload: { user, token, role } });

        return { user, token, role };
      }
    } catch (error) {
      continue;
    }
  }

  dispatch({ type: LOGIN_FAIL, payload: "Sai email hoặc mật khẩu" });
  return null;
};



/**
 * Đăng ký người dùng mới
 */

export const register = (name,email, password, role) => async (dispatch) => {
  try {
    const apiUrl =
      role === "shop"
        ? "http://127.0.0.1:8000/api/shop_owner/register"
        : "http://127.0.0.1:8000/api/user/register";

    console.log("📡 Gửi request đến:", apiUrl);
    console.log("📨 Dữ liệu:", { email, password });

    const response = await axios.post(apiUrl, { name , email, password });

    console.log("✅ Phản hồi từ API:", response.data);

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    return { success: true };
  } catch (error) {
    console.error("❌ Lỗi API:", error.response?.data || error.message);

    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.message || "Đăng ký thất bại!",
    });

    return { success: false, error: error.response?.data?.message };
  }
};



/**
 * Yêu cầu gửi lại OTP nếu chưa xác thực email
 */
export const resendOtp = (email, role) => async (dispatch) => {
  try {
    const apiUrl =
      role === "shop"
        ? "http://127.0.0.1:8000/api/shop_owner/resend_otp"
        : "http://127.0.0.1:8000/api/user/resend_otp";

    await axios.post(apiUrl, { email });

    dispatch({
      type: RE_REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: RE_REGISTER_FAIL,
      payload: error.response?.data?.message || "Gửi lại OTP thất bại!",
    });
  }
};


//ham xac thuc otp
export const verifyOtp = (email, otp, role) => async (dispatch) => {
  try {
    const apiUrl =
      role === "shop"
        ? "http://127.0.0.1:8000/api/shop_owner/verify"
        : "http://127.0.0.1:8000/api/user/verify";

    const response = await axios.post(apiUrl, { email, otp });

    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: response.data,
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload: error.response?.data?.message || "Xác thực OTP thất bại!",
    });

    return { success: false, error: error.response?.data?.message };
  }
};
