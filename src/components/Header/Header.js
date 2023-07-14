import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Typography, Button, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import logo from '../../assets/images/logo.png';
import s from './Header.module.css';



const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        backgroundColor: '#4267B2',
        color: 'white',
        padding: theme.spacing(2),
    },
    logo: {
        width: '40px',
        height: '40px',
        marginRight: theme.spacing(2),
    },
    loginBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    loginText: {
        marginRight: theme.spacing(1),
    },
    logoutButton: {
        color: 'white',
    },
    unlogged: {
        color: 'white',
        textDecoration: 'none',
    },
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const login = useSelector((state) => state.auth.login);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className={classes.header + " " + s.header}>
            <NavLink to="/profile">
                <Avatar src={logo} alt="logo" className={classes.logo} />
            </NavLink>
            <div className={classes.loginBlock}>
                {isAuth ? (
                    <>
                        <Typography variant="body1" className={classes.loginText}>
                            {login}
                        </Typography>
                        <Button variant="text" className={classes.logoutButton} onClick={handleLogout}>
                            Log out
                        </Button>
                    </>
                ) : (
                    <NavLink to="/login" className={classes.unlogged}>
                        Login
                    </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
