import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

const initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

export const getUsersThunkCreator = createAsyncThunk(
    "users/getUsers",
    async ({ currentPage, pageSize }, { dispatch }) => {
        dispatch(setIsFetching(true));
        const response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));
        dispatch(setIsFetching(false));
    }
);

export const followSuccess = createAsyncThunk("users/follow", async (id, { dispatch }) => {
    dispatch(toggleFollowingProgress({ isFetching: true, id }));
    const response = await usersAPI.follow(id);
    if (response.data.resultCode === 0) {
        dispatch(followAC(id));
        console.log(response.data);
    }
    dispatch(toggleFollowingProgress({ isFetching: false, id }));
});

export const unfollowSuccess = createAsyncThunk("users/unfollow", async (id, { dispatch }) => {
    dispatch(toggleFollowingProgress({ isFetching: true, id }));
    const response = await usersAPI.unfollow(id);
    if (response.data.resultCode === 0) {
        dispatch(unfollowAC(id));
        console.log(response.data);
    }
    dispatch(toggleFollowingProgress({ isFetching: false, id }));
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        followAC: (state, action) => {
            state.users = state.users.map((u) => {
                if (u.id === action.payload) {
                    return { ...u, followed: true };
                }
                return u;
            });
        },
        unfollowAC: (state, action) => {
            state.users = state.users.map((u) => {
                if (u.id === action.payload) {
                    return { ...u, followed: false };
                }
                return u;
            });
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCurrentPageAC: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalUsersCount: (state, action) => {
            state.totalUsersCount = action.payload;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        toggleFollowingProgress: (state, action) => {
            const { isFetching, id } = action.payload;
            state.followingInProgress = isFetching
                ? [...state.followingInProgress, id]
                : state.followingInProgress.filter((followId) => followId !== id);
        },
    },
});

export const {
    followAC,
    unfollowAC,
    setUsers,
    setCurrentPageAC,
    setTotalUsersCount,
    setIsFetching,
    toggleFollowingProgress,
} = usersSlice.actions;

export default usersSlice.reducer;
