const { createSlice } = require("@reduxjs/toolkit");

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const storedUserInfo = localStorage.getItem("userInfo");
    return {
      userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
    };
  }
  return {
    userInfo: null,
  };
};

const initialState = getInitialState();

// const initialState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
// };



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
