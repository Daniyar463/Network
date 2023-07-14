import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../api/api";

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
};

export const getAuthUserData = createAsyncThunk(
    "auth/getAuthUserData",
    async (_, { dispatch }) => {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) {
            const { id, email, login } = response.data.data;
            dispatch(setAuthUserData({ userId: id, email, login, isAuth: true }));
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password, rememberMe }, { dispatch }) => {
        const response = await authAPI.login(email, password, rememberMe);
        console.log("login....");
        if (response.data.resultCode === 0) {
            await dispatch(getAuthUserData());
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataLogout());
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUserData: (state, action) => {
            const { userId, email, login, isAuth } = action.payload;
            state.userId = userId;
            state.email = email;
            state.login = login;
            state.isAuth = isAuth;
        },
        getAuthUserDataLogout: (state) => {
            state.userId = null;
            state.email = null;
            state.login = null;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthUserData.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(getAuthUserData.fulfilled, (state) => {
            state.isFetching = false;
        });
        builder.addCase(getAuthUserData.rejected, (state) => {
            state.isFetching = false;
        });
        builder.addCase(login.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.isFetching = false;
        });
        builder.addCase(login.rejected, (state) => {
            state.isFetching = false;
        });
        builder.addCase(logout.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isFetching = false;
        });
        builder.addCase(logout.rejected, (state) => {
            state.isFetching = false;
        });
    },
});

export const { setAuthUserData, getAuthUserDataLogout } =
    authSlice.actions;

export default authSlice.reducer;

