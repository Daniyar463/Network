import React from 'react';
import preloader from './../../../assets/images/loader.gif';


const Preloader = ({ isFetching }) => {
    return (
        <div style={{ padding: "20px", width: "200px" }}>
            {isFetching ? <img src={preloader} style={{ width: "100%" }} /> : null}
        </div>
    )
}

export default Preloader