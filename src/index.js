import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>

);



// store.subscribe(() => {
//     root.render(
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// })


reportWebVitals();
// no more needed cause hook useSelector subscribes by itself resulting in local render only thus saving expensive creation of virtual dom
// useDispatch не требует подпсики он просто диспатч отнимает у стора
