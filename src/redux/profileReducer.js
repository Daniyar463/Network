import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileAPI, usersAPI } from "../api/api";

const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'It is my first post', likesCount: 0 },
        { id: 3, message: 'Sveta', likesCount: 14 },
        { id: 4, message: 'Sasha', likesCount: 5 },
        { id: 5, message: 'Runner', likesCount: 4 },
        { id: 6, message: 'Valera', likesCount: 23 }
    ],
    profile: null,
    status: ""
};

export const getUserProfile = createAsyncThunk(
    "profile/getUserProfile",
    async (userId) => {
        const response = await usersAPI.getProfile(userId);
        return response.data;
    }
);

export const getStatus = createAsyncThunk(
    "profile/getStatus",
    async (userId) => {
        const response = await profileAPI.getStatus(userId);
        return response.data;
    }
);

export const updateStatus = createAsyncThunk(
    "profile/updateStatus",
    async (status) => {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            return status;
        }
    }
);

export const savePhoto = createAsyncThunk(
    "profile/savePhoto",
    async (file) => {
        const response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            return response.data.data.photos;
        }
    }
);

export const saveProfile = createAsyncThunk(
    "profile/saveProfile",
    async (profile, { getState, dispatch }) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            await dispatch(getUserProfile(userId));
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                id: state.posts.length + 1,
                message: action.payload,
                likesCount: 0
            };
            state.posts.push(newPost);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((p) => p.id !== action.payload);
        },
        savePhotoSuccess: (state, action) => {
            state.profile = { ...state.profile, photos: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(getStatus.fulfilled, (state, action) => {
            state.status = action.payload;
        });
        builder.addCase(updateStatus.fulfilled, (state, action) => {
            state.status = action.payload;
        });
        builder.addCase(savePhoto.fulfilled, (state, action) => {
            state.profile = { ...state.profile, photos: action.payload };
        });
    },
});

export const { addPost, deletePost, savePhotoSuccess } = profileSlice.actions;

export default profileSlice.reducer;

