import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userVideos: [],


};
   

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
        },
        setAllVideos: (state, action) => {
            state.userInput = action.payload;
        },


    },
});

export const { login, logout ,setAllVideos} = userSlice.actions;

export default userSlice.reducer;