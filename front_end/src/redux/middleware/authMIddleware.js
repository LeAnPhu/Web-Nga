const authMiddleware = (store) => (next) => (action) => {
    if (action.type === "LOGIN_SUCCESS") {
      console.log(`User logged in with role: ${action.payload.role}`);
    }
    return next(action);
  };
  
  export default authMiddleware;