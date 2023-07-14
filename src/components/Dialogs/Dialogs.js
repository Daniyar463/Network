import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer'
import DialogItem from './DialogItem/DialogItem'
import c from './Dialogs.module.css'
import Message from './Message/Message'
import { useNavigate } from 'react-router-dom'

const Dialogs = () => {

    const navigate = useNavigate();

    const dialogs = useSelector((state) => state.dialogsPage.dialogs);
    const messages = useSelector((state) => state.dialogsPage.messages);
    const newMessageText = useSelector((state) => state.dialogsPage.newMessageText);

    const isAuth = useSelector((state) => state.auth.isAuth)

    const dispatch = useDispatch();

    const addMessage = () => {
        dispatch(addMessageActionCreator());
    }

    const onMessageChange = (e) => {
        dispatch(updateNewMessageActionCreator(e.target.value));
    };

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('./../../login')
    //     }
    // }, [isAuth])


    return (
        <div className={c.dialogs}>
            <h2 style={{ color: 'white', fontSize: '35px', position: 'absolute', top: '-5px', left: "50%", transform: "translateX(-50%)" }}>Messages</h2>
            <div className={c["dialogs-items"]}>
                {dialogs.map(d => {
                    return <DialogItem name={d.name} id={d.id} />
                })}
            </div>
            <div className={c.messages}>
                {messages.map(d => {
                    return <Message message={d.message} />
                })}
                <textarea
                    value={newMessageText}
                    onChange={onMessageChange}
                />
                <div><button onClick={addMessage}>Click</button></div>
            </div>
        </div>
    )
}

export default Dialogs;
