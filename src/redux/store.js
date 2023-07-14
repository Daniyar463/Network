// import profileReducer from "./profileReducer";
// import dialogsReducer from "./dialogsReducer";

// let store = {
//     _state: {
//         profilePage: {
//             posts: [{ likes: 14, message: "Hi, how are you?" },
//             { likes: 22, message: "Hi, how is your itkamasutra?" },
//             { likes: 23, message: "yes!" },
//             ],

//             newPostText: "It kamasutra",
//         },
//         dialogsPage: {
//             messages: [
//                 { id: 1, message: "Hi" },
//                 { id: 2, message: "Valar Morgulis" },
//                 { id: 3, message: "Duh" }
//             ],
//             dialogs: [
//                 { id: 1, name: "Yen" },
//                 { id: 2, name: "Tris" },
//                 { id: 3, name: "Gerald" },
//                 { id: 4, name: "Deayne" },
//             ],
//             newMessageText: "hello"
//         }
//     },
//     getState() {
//         return this._state
//     },
//     _callSubscriber() {
//         console.log("state is changed");
//     },

//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._callSubscriber();
//     }
// }





// export default store;