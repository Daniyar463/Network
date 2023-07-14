import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Valar Morgulis" },
        { id: 3, message: "Duh" },
    ],
    dialogs: [
        { id: 1, name: "Yen" },
        { id: 2, name: "Tris" },
        { id: 3, name: "Gerald" },
        { id: 4, name: "Deayne" },
    ],
    newMessageText: "hello",
};

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        addMessageActionCreator: (state) => {
            state.messages.push({ id: 13, message: state.newMessageText });
            state.newMessageText = "";
        },
        updateNewMessageActionCreator: (state, action) => {
            state.newMessageText = action.payload;
        },
    },
});

export const { addMessageActionCreator, updateNewMessageActionCreator } = dialogsSlice.actions;

export default dialogsSlice.reducer;
