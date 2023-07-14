import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatus } from '../../../redux/profileReducer'

const ProfileStatus = () => {

    const status = useSelector((state) => state.profilePage.status)

    const dispatch = useDispatch();



    const [editMode, setEditMode] = useState(false);
    const [inputText, setinputText] = useState("dfdf");

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(inputText))
    }

    return (

        <div>
            {!editMode &&
                <div>
                    <b>Status:</b>
                    <span style={{ marginLeft: "5px" }} value={status || "no status currently"} onDoubleClick={() => { setEditMode(true) }}>{status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <b>Status:</b>
                    <input style={{ marginLeft: "5px" }} value={inputText} onChange={(e) => setinputText(e.target.value)} onBlur={() => deactivateEditMode(false)} />
                </div>
            }
        </div>
    )
}





export default ProfileStatus;
