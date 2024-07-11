import { createSlice } from "@reduxjs/toolkit";

const initalThemeState = {
    theme:false
}

const themeSlice = createSlice({
    name:"theme",
    initialState:initalThemeState,
    reducers:{
        toogle(state){
            state.theme = !state.theme
        }
    }
})

export default themeSlice.reducer
export const themeActions = themeSlice.actions;