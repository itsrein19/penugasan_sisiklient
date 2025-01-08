import { createSlice } from "@reduxjs/toolkit";

// Slice untuk autentikasi
const authSlice = createSlice({
  name: "auth", 
  initialState: {
    user: null, 
    token: null, 
  },
  reducers: {
    // Reducer untuk login
    login: (state, action) => {
      state.user = action.payload.user; 
      state.token = action.payload.token; 
    },
    // Reducer untuk logout
    logout: (state) => {
      state.user = null; 
      state.token = null; 
    },
  },
});

// Ekspor actions untuk digunakan di komponen
export const { login, logout } = authSlice.actions;

// Ekspor reducer untuk digunakan di store
export default authSlice.reducer;
