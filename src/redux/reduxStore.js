// import { applyMiddleware, combineReducers, createStore } from "redux";
// import dialogsReducer from "./dialogsReducer";
// import profileReducer from "./profileReducer";
// import usersReducer from "./usersReducer";
// import authReducer from "./auth-reducer";
// import thunk from "redux-thunk";
// import appReducer from "./app-reducer";
//
// let reducers = combineReducers(
//     {
//         profilePage: profileReducer,
//         dialogsPage: dialogsReducer,
//         usersPage: usersReducer,
//         auth: authReducer,
//         app: appReducer
//     }
// );
//
// let store = createStore(reducers, applyMiddleware(thunk));
// window.store = store;
//
// export default store;


// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import profileSlice from "./profileReducer";
// import dialogsSlice from "./dialogsReducer";
// import usersSlice from "./usersReducer";
// import authSlice from "./auth-reducer";
// import appSlice from "./app-reducer";
//
// const store = configureStore({
//         reducer: {
//                 profilePage: profileSlice,
//                 dialogsPage: dialogsSlice,
//                 usersPage: usersSlice,
//                 auth: authSlice,
//                 app: appSlice
//         },
//         middleware: [thunk],
// });
//
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

const store = configureStore({
        reducer: {
                profilePage: profileReducer,
                dialogsPage: dialogsReducer,
                usersPage: usersReducer,
                auth: authReducer,
                app: appReducer
        },
});

export default store;
