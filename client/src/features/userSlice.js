import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice ({
  name: "user",
  initialState: {
    user: null
  },
  reducers:{
    login: (state , action) => {
      // payload es el nuevo dato con el que actualizamos el estado
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const {login, logout} = userSlice.actions;
// De esta manera traemos al usuario al usuario
export const selectUser = (state) => state.user.user;
export default userSlice.reducer; 