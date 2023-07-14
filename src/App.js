import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import Dialogs from "./components/Dialogs/Dialogs";
import { initializeApp } from "./redux/app-reducer";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import Content from "./components/Content/Content";
import News from "./components/News/News";

const App = () => {

  const isAuth = useSelector((state) => state.auth.isAuth);
  const initialized = useSelector((state) => state.app.initialized);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth])

  useEffect(() => {
    console.log("Initializing app...");
    dispatch(initializeApp())
  }, [initialized]);

  if (!initialized) {
    return <Preloader isFetching={"true"} />
  }


  return (
    <div>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            {/* <Route path="/dialogs/*" element={<React.Suspense fallback={<div>...loading</div>}><Dialogs /></React.Suspense >} />
                        <Route path="/content/:userId?" element={<React.Suspense fallback={<div>...loading</div>}><Content /></React.Suspense >} /> */}
            <Route path="/dialogs/*" element={<Dialogs />} />
            <Route path="/profile/:id?" element={<Content />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/*" element={<Content />} />
            <Route path="/users" element={<Users />} />
            <Route path="/news" element={<News />} />
          </Routes>

        </div>

      </div>
    </div>
  );
}

export default App;