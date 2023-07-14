// import { usersAPI } from "../api/api";
//
// const FOLLOW = "FOLLOW";
// const UNFOLLOW = "UNFOLLOW";
// const SET__USERS = "SET__USERS";
// const SET__CURRENT__PAGE = "SET__CURRENT__PAGE";
// const SET__TOTAL__USERS__COUNT = "SET__TOTAL__USERS__COUNT";
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
// const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";
//
// let initialState = {
//     users: [],
//     pageSize: 100,
//     totalUsersCount: 100,
//     currentPage: 1,
//     isFetching: false,
//     followingInProgress: []
// };
//
// const usersReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FOLLOW:
//             return {
//                 ...state,
//                 users: state.users.map((u) => {
//                     if (u.id === action.userId) {
//                         return { ...u, followed: true };
//                     }
//                     return u;
//                 }),
//             };
//         case UNFOLLOW:
//             return {
//                 ...state,
//                 users: state.users.map((u) => {
//                     if (u.id === action.userId) {
//                         return { ...u, followed: false }
//                     }
//                     return u;
//                 })
//             };
//         case SET__CURRENT__PAGE:
//             return {
//                 ...state,
//                 currentPage: action.page
//             }
//         case SET__TOTAL__USERS__COUNT:
//             return {
//                 ...state,
//                 totalUsersCount: action.total
//             }
//         case SET__USERS:
//             return {
//                 ...state,
//                 users: action.users
//             }
//         case TOGGLE_IS_FETCHING:
//             return {
//                 ...state,
//                 isFetching: action.isFetching
//             }
//         case TOGGLE_FOLLOWING_PROGRESS:
//             return {
//                 ...state,
//                 followingInProgress: action.isFetching ?
//                     [...state.followingInProgress, action.id] :
//                     state.followingInProgress.filter((id) => id !== action.id)
//             }
//         default:
//             return state;
//     };
// };
//
//
// export const followAC = (userId) => ({ type: FOLLOW, userId })
// export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
// export const setUsersAC = (users) => ({ type: SET__USERS, users })
// export const setCurrentPageAC = (page) => ({ type: SET__CURRENT__PAGE, page })
// export const setTotalUsersCountAC = (total) => ({ type: SET__TOTAL__USERS__COUNT, total })
// export const setIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
// export const toggleFollowingProgress = (isFetching, id) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, id })
//
// export const getUsersThunkCreator = (currentPage, pageSize) => (dispatch) => {
//     dispatch(setIsFetchingAC(true));
//     usersAPI.getUsers(currentPage, pageSize)
//         .then(({ data }) => {
//             dispatch(setUsersAC(data.items));
//             dispatch(setTotalUsersCountAC(data.totalCount));
//             dispatch(setIsFetchingAC(false));
//         })
// }
//
// export const followSuccess = (id) => (dispatch) => {
//     dispatch(toggleFollowingProgress(true, id))
//     usersAPI.follow(id)
//         .then(({ data }) => {
//             if (data.resultCode === 0) {
//                 dispatch(followAC(id))
//                 console.log(data);
//             }
//             dispatch(toggleFollowingProgress(false, id))
//         })
// }
//
// export const unfollowSuccess = (id) => (dispatch) => {
//     dispatch(toggleFollowingProgress(true, id))
//     usersAPI.unfollow(id)
//         .then(({ data }) => {
//             if (data.resultCode === 0) {
//                 dispatch(unfollowAC(id))
//                 console.log(data);
//             }
//             dispatch(toggleFollowingProgress(false, id))
//         })
// }
//
// export default usersReducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../api/api";

const initialState = {
    users: [],
    pageSize: 50,
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

