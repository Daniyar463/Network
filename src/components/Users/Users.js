import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followSuccess, getUsersThunkCreator, setCurrentPageAC, unfollowSuccess } from '../../redux/usersReducer';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { createPages } from '../common/createPages/pagesCreator';

import userPhoto from './../../assets/images/user.jpg';
import styles from './Users.module.css';

const SkeletonLoader = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
            <CircularProgress />
            <Box sx={{ width: 210, height: 60, my: 1 }}>
                <CircularProgress />
            </Box>
            <Box sx={{ width: 210, height: 60, my: 1 }}>
                <CircularProgress />
            </Box>
        </Box>
    );
};

const Users = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const users = useSelector((state) => state.usersPage.users);
    const pageSize = useSelector((state) => state.usersPage.pageSize);
    const totalUsersCount = useSelector((state) => state.usersPage.totalUsersCount);
    const currentPage = useSelector((state) => state.usersPage.currentPage);
    const isFetching = useSelector((state) => state.usersPage.isFetching);
    const followingInProgress = useSelector((state) => state.usersPage.followingInProgress);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator({ currentPage, pageSize }));
    }, [currentPage, totalUsersCount, pageSize, dispatch]);

    const handleFollow = (userId) => {
        dispatch(followSuccess(userId));
    };

    const handleUnfollow = (userId) => {
        dispatch(unfollowSuccess(userId));
    };

    const handlePageClick = (page) => {
        dispatch(setCurrentPageAC(page));
    };

    const pages = [];
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    createPages(pages, pagesCount, currentPage);

    return (
        <Box>
            <Typography variant="h2" align="center" style={{ color: 'white', fontSize: '35px' }}>
                Users
            </Typography>

            <Box className={styles.pagesContainer} sx={{ textAlign: 'center', my: 2 }}>
                {'<<'}
                {pages.map((p) => (
                    <Button
                        key={p}
                        className={`${styles.pages} ${currentPage === p ? styles.selectedPage : ''}`}
                        onClick={() => handlePageClick(p)}
                    >
                        {p}
                    </Button>
                ))}
                {'>>'}
            </Box>

            {isFetching ? (
                <SkeletonLoader />
            ) : (
                users.map((u) => (
                    <Box key={u.id} className={styles.user}>
                        <Box>
                            <NavLink to={'./../profile/' + u.id}>
                                <img className={styles.userPhoto} src={u.photos.small || u.photos.large || userPhoto} alt="user" />
                            </NavLink>
                        </Box>
                        <Box>
                            {u.followed ? (
                                <Button
                                    disabled={followingInProgress.some((id) => id === u.id) || !isAuth}
                                    onClick={() => handleUnfollow(u.id)}
                                >
                                    Unfollow
                                </Button>
                            ) : (
                                <Button
                                    disabled={followingInProgress.some((id) => id === u.id) || !isAuth}
                                    onClick={() => handleFollow(u.id)}
                                >
                                    Follow
                                </Button>
                            )}
                        </Box>
                        <Box>
                            <Box>{u.name}</Box>
                            <Box>{u.status}</Box>
                        </Box>
                    </Box>
                ))
            )}

            <Box className={styles.pagesContainer} sx={{ textAlign: 'center', my: 2 }}>
                {'<<'}
                {pages.map((p) => (
                    <Button
                        key={p}
                        className={`${styles.pages} ${currentPage === p ? styles.selectedPage : ''}`}
                        onClick={() => handlePageClick(p)}
                    >
                        {p}
                    </Button>
                ))}
                {'>>'}
            </Box>
        </Box>
    );
};

export default Users;
