import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthUserData } from "./auth-reducer";

const initialState = {
    initialized: false,
};

export const initializeApp = createAsyncThunk(
    "app/initializeApp",
    async (_, { dispatch }) => {
        await dispatch(getAuthUserData());
    }
);

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        initializedSuccess: (state) => {
            state.initialized = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.initialized = true;
        });
    },
});

export const { initializedSuccess } = appSlice.actions;

export default appSlice.reducer;
