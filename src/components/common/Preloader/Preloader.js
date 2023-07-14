import React from 'react';
import preloader from './../../../assets/images/loader.gif';
import './Preloader.css'

const Preloader = ({ isFetching }) => {
    return (
        <div>
            {isFetching ? <img className={"preloader-img"} src={preloader} /> : null}
        </div>
    )
}

export default Preloader