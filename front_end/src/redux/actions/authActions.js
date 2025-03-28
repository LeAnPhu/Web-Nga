import axios from "../../api/axiosInstance";
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,OTP_EXPIRED ,RE_REGISTER_SUCCESS,RE_REGISTER_FAIL, RESET_PASSWORD_SUCCESS,RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_SUCCESS} from "../types";

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
      role === "shop_owner"
        ? "http://127.0.0.1:8000/api/shop_owner/register"
        : "http://127.0.0.1:8000/api/user/register";

    const response = await axios.post(apiUrl, { name , email, password , role});

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    return { success: true };
  } 
  catch (error)
  {

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
      role === "shop_owner"
        ? "http://127.0.0.1:8000/api/shop_owner/resend_otp"
        : "http://127.0.0.1:8000/api/user/resend_otp";

    await axios.post(apiUrl, { email });

    dispatch({
      type: RE_REGISTER_SUCCESS,
    });
  } 
  catch (error) 
  {
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
      role === "shop_owner"
        ? "http://127.0.0.1:8000/api/shop_owner/verify"
        : "http://127.0.0.1:8000/api/user/verify";
  
    console.log("Payload gửi đi:", { email, otp, role });
    const response = await axios.post(apiUrl, { email, otp, role });

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

//Ham cap nhat mat khau 
export const resetPassword = ({ email, password, confirmPassword, role }) => async (dispatch) => {
  try {
    const apiUrl =
      role === "shop_owner"
        ? "http://127.0.0.1:8000/api/shop_owner/reset-password"
        : "http://127.0.0.1:8000/api/user/reset-password";

    await axios.post(apiUrl, {
      email,
      password,
      password_confirmation: confirmPassword, 
    });
    console.log("Password" , {password});
    console.log("Password Confirm" , {confirmPassword});
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
    
    return { success: true };
  } 
  catch (error) 
  {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response?.data?.message || "Đặt lại mật khẩu thất bại!",
    });

    return { success: false, error: error.response?.data?.message };
  }
};

//Ham quen mat khau 
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "FORGOT_PASSWORD_REQUEST" });
    const roleRes = await fetch("http://127.0.0.1:8000/api/get-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!roleRes.ok) {
      const error = await roleRes.json();
      dispatch({
        type: "FORGOT_PASSWORD_FAIL",
        payload: error.message || "Không lấy được vai trò người dùng",
      });
      return null;
    }

    const { role } = await roleRes.json();
    const forgotUrl =
      role === "shop_owner"
        ? "http://127.0.0.1:8000/api/shop_owner/forgot-password"
        : "http://127.0.0.1:8000/api/user/forgot-password";

    const otpRes = await fetch(forgotUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!otpRes.ok) {
      const error = await otpRes.json();
      dispatch({
        type: "FORGOT_PASSWORD_FAIL",
        payload: error.message || "Gửi OTP thất bại",
      });
      return null;
    }

    const data = await otpRes.json();
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data });

    return { email, role };
  } catch (error) {
    dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: "Lỗi hệ thống" });
    return null;
  }
};



