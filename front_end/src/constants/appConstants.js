const APP_CONSTANTS = {
    DEFAULT_PAGE_SIZE: 10,        // Số lượng mặc định trên mỗi trang
    MAX_CART_ITEMS: 20,           // Giới hạn số lượng sản phẩm trong giỏ hàng
    API_TIMEOUT: 5000,            // Thời gian timeout khi gọi API (milisecond)
    BASE_URL: process.env.REACT_APP_API_URL, // Cấu hình URL cơ bản cho API từ .env
  };
  
  export default APP_CONSTANTS;
  