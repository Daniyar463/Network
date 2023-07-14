import React from 'react'
import c from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom'



const DialogItem = ({ id, name }) => {
    return (
        <div className={c.dialog + ' ' + c.active}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

export default DialogItem