// src/constants/httpStatusCodes.js

const HTTP_STATUS_CODES = {
    OK: 200,             // Thành công
    CREATED: 201,        // Đã tạo thành công
    NO_CONTENT: 204,     // Không có nội dung
    BAD_REQUEST: 400,    // Yêu cầu không hợp lệ
    UNAUTHORIZED: 401,   // Không có quyền truy cập
    FORBIDDEN: 403,      // Bị cấm truy cập
    NOT_FOUND: 404,      // Không tìm thấy
    INTERNAL_SERVER_ERROR: 500, // Lỗi máy chủ nội bộ
    SERVICE_UNAVAILABLE: 503,   // Dịch vụ không khả dụng
  };
  
  export default HTTP_STATUS_CODES;
  