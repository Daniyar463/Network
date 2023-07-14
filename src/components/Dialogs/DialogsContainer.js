// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer';
// import Dialogs from './Dialogs';
// import { connect } from "react-redux";

// const DialogsContainer = () => {

//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     const handleAddMessage = () => {
//                         store.dispatch(addMessageActionCreator())
//                     }
//                     const handleOnMessageChange = (text) => {
//                         store.dispatch(updateNewMessageActionCreator(text))
//                     }
//                     return (<Dialogs handleAddMessage={handleAddMessage} handleOnMessageChange={handleOnMessageChange} newMessageText={store.getState().dialogsPage.newMessageText} dialogs={store.getState().dialogsPage.dialogs} messages={store.getState().dialogsPage.messages} />)
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

// import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer';
// import Dialogs from './Dialogs';
// import { connect } from "react-redux";

// let mapStateToProps = (state) => {
//     return {
//         dialogs: state.dialogsPage.dialogs,
//         messages: state.dialogsPage.messages,
//         newMessageText: state.dialogsPage.newMessageText
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         handleAddMessage() { dispatch(addMessageActionCreator()) },
//         handleOnMessageChange(text) { dispatch(updateNewMessageActionCreator(text)) }
//     }
// }

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

// export default DialogsContainer