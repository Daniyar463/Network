//
// import { getAuthUserData } from "./auth-reducer";
//
// const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
//
//
// let initialState = {
//     initialized: false
//
// };
//
//
// const appReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case INITIALIZED_SUCCESS:
//
//             return {
//                 ...state,
//                 initialized: true
//             }
//         default:
//             return state;
//     }
// }
//
// export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
//
// export const initializeApp = () => (dispatch) => {
//     let promise = dispatch(getAuthUserData());
//     Promise.all([promise])
//         .then(() => {
//             dispatch(initializedSuccess());
//         });
// }
//
// export default appReducer;


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

