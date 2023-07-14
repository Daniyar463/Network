import React from 'react'
import c from './../Dialogs.module.css'



const Message = ({ message }) => {
    return (

        <div className={c.message}>{message}</div>
    )
}

export default Message