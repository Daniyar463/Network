import React from 'react'
import c from './Post.module.css'


const Post = (props) => {
    return (
        <div className={c.post}>
            <img src="https://static01.nyt.com/images/2022/12/14/multimedia/14avatar1-1-6cf3/14avatar1-1-6cf3-mobileMasterAt3x-v3.jpg" alt="ava" />
            {props.message}
            <div><span>Like {props.likes}</span></div>
        </div>
    )
}

export default Post