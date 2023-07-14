import React, { useEffect } from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.ico"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/auth-reducer";


const Header = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector((state) => state.auth.isAuth);
    const login = useSelector((state) => state.auth.login);

    return (
        <header className={s.header}>
            {/*<NavLink to={"/profile"}> <img src={logo} alt="logo" /></NavLink>*/}
            <span className={s.socialMedia}>Social Media</span>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div className={s.login}>{login} - <button className={s.logged} onClick={() => dispatch(logout())}>Log out</button></div>
                    : <NavLink to="/login" className={s.unlogged}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;
