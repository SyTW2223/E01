import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice ({
  name: "user",
  token: "token",
  initialState: {
    user: null,
    token: null
  },
  reducers:{
    login: (state , action) => {
      const user = action.payload;
      const token = action.payload;
      // payload es el nuevo dato con el que actualizamos el estado
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    }
  }
});

export const {login, logout} = userSlice.actions;
// De esta manera traemos al usuario al usuario
export const selectUser = (state) => state.user.user;
export default userSlice.reducer; 