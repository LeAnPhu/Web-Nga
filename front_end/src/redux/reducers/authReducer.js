import {LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_SUCCESS,REGISTER_FAIL,
  VERIFY_OTP_SUCCESS,VERIFY_OTP_FAIL,OTP_EXPIRED,RE_REGISTER_SUCCESS,RE_REGISTER_FAIL,} from "../types";


const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  otpExpired: false, 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true, // tHEM KIEM TRA DA DANG NHAP CHUAC
        error: null,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
        otpExpired: false, // Khi đăng ký thành công, đặt lại otpExpired
      };

    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        otpExpired: action.payload.includes("OTP đã hết hạn"), // Nếu lỗi liên quan đến OTP, cập nhật trạng thái
      };

    case RE_REGISTER_SUCCESS:
      return {
        ...state,
        otpExpired: false, // Khi gửi lại OTP thành công, đặt lại otpExpired
        error: null,
      };

    case RE_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        otpExpired: action.payload.includes("OTP đã hết hạn"),
      };

      case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null,
      };

    case VERIFY_OTP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case OTP_EXPIRED:  
      return {
        ...state,
        otpExpired: true,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer

