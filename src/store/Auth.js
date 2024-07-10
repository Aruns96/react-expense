import { createSlice } from "@reduxjs/toolkit";
const useridToken = localStorage.getItem("token") || null;
 
  const userLocalID = localStorage.getItem("userID") || null;
  
const initalAuthState = {
    isLoggedIn : !!useridToken,
    idToken: useridToken,
    userID: userLocalID,
    isEmailVerified: false,}

const authSlice=createSlice({
    name:"auth",
    initialState:initalAuthState,
    reducers:{
          setLogin(state, action) {
            state.isLoggedIn = action.payload;
          },
          setIdToken(state, action) {
            state.idToken = action.payload;
          },
          setUserID(state, action) {
            state.userID = action.payload;
          },
          setEmailVerified(state, action) {
            state.isEmailVerified = action.payload;
          },
          logOut(state) {
            state.isLoggedIn = false;
            state.idToken = "";
            state.userID = "";
            state.isEmailVerified = false;
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            localStorage.removeItem("email");
          },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;