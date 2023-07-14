import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followSuccess, getUsersThunkCreator, setCurrentPageAC, unfollowSuccess } from '../../redux/usersReducer';
import { Typography, Button, Avatar, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Preloader from '../common/Preloader/Preloader';
import { createPages } from '../common/createPages/pagesCreator';
import userPhoto from '../../assets/images/user.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        color: 'white',
        fontSize: '35px',
        position: 'absolute',
        top: '-5px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    pagesContainer: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0',
    },
    pages: {
        color: 'white',
        cursor: 'pointer',
        margin: '0 5px',
        '&.selectedPage': {
            fontWeight: 'bold',
        },
    },
    user: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    userPhoto: {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
}));

const Users = () => {
    const classes = useStyles();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const users = useSelector((state) => state.usersPage.users);
    const pageSize = useSelector((state) => state.usersPage.pageSize);
    const totalUsersCount = useSelector((state) => state.usersPage.totalUsersCount);
    const currentPage = useSelector((state) => state.usersPage.currentPage);
    const isFetching = useSelector((state) => state.usersPage.isFetching);
    const followingInProgress = useSelector((state) => state.usersPage.followingInProgress);

    let pages = [];
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    createPages(pages, pagesCount, currentPage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator({ currentPage, pageSize }));
    }, [currentPage, totalUsersCount, pageSize]);

    const handleFollow = (userId) => {
        dispatch(followSuccess(userId));
    };

    const handleUnfollow = (userId) => {
        dispatch(unfollowSuccess(userId));
    };


    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2" style={{ position: "absolute", top: "10px", top: '15px', left: "50%", transform: "translateX(-50%)" }} className={classes.heading}>
                Users
            </Typography>
            <div className={classes.pagesContainer}>
                <KeyboardArrowLeft
                    onClick={() => dispatch(setCurrentPageAC(currentPage - 1))}
                    style={{ cursor: 'pointer', fontSize: '24px' }}
                />
                {pages.map((p) => (
                    <span
                        onClick={() => dispatch(setCurrentPageAC(p))}
                        key={p}
                        style={{ cursor: 'pointer', fontSize: '24px' }}
                        className={`${classes.pages} ${currentPage === p ? 'selectedPage' : ''}`}
                    >
                        {p}
                    </span>
                ))}
                <KeyboardArrowRight
                    onClick={() => dispatch(setCurrentPageAC(currentPage + 1))}
                    style={{ cursor: 'pointer', fontSize: '24px' }}
                />
            </div>
            <Preloader isFetching={isFetching} />
            <Grid container spacing={2}>
                {users.map((u) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={u.id}>
                        <div className={classes.user}>
                            <div>
                                <NavLink to={`./../profile/${u.id}`}>
                                    <Avatar className={classes.userPhoto} src={u.photos.small || u.photos.large || userPhoto} alt="user" />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ? (
                                    <Button
                                        style={{ color: 'white' }}
                                        disabled={followingInProgress.some((id) => id === u.id) || !isAuth}
                                        onClick={() => handleUnfollow(u.id)}
                                    >
                                        Unfollow
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={followingInProgress.some((id) => id === u.id) || !isAuth}
                                        onClick={() => handleFollow(u.id)}
                                        style={{ color: 'white' }}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Users;
