import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getStatus, getUserProfile, savePhoto, saveProfile } from '../../../redux/profileReducer';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileDataForm from './ProfileForm';
import ProfileStatus from './ProfileStatus';
import s from './ProfileInfo.module.css';

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        padding: theme.spacing(2),
    },
    heading: {
        color: 'white',
        fontSize: '35px',
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    avatar: {
        width: '200px',
        height: '200px',
        margin: '0 auto',
    },
}));

const ProfileInfo = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profilePage.profile);
    const userId = useSelector((state) => state.auth.userId);
    const isAuth = useSelector((state) => state.auth.isAuth);
    let { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isAuth && !id && userId) {
            id = userId;
            setIsMe(true);
        } else {
            setEditMode(false);
            setIsMe(false);
        }
    }, [id]);

    useEffect(() => {
        dispatch(getUserProfile(id));
        dispatch(getStatus(id));
    }, [id, userId]);

    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            console.log("files", e.target.files);
            dispatch(savePhoto(e.target.files[0]));
        }
    };

    const toggleModal = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    const onSubmit = (data) => {
        dispatch(saveProfile(data));
        setEditMode(false);
    };

    if (!profile) {
        return <Preloader isFetching={true} />;
    }

    if (!isAuth && id == userId) {
        return <Preloader isFetching={true} />;
    }

    if (!isAuth && userId) {
        return <Preloader isFetching={true} />;
    }

    return (
        <div className={classes.profileContainer}>
            <Typography variant="h2" className={classes.heading} style={{ position: "absolute", top: "10px", top: '15px', left: "50%", transform: "translateX(-50%)" }}>
                Profile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Avatar src={profile.photos.large || profile.photos.small || userPhoto} className={classes.avatar} alt="avatar" />
                    {isMe && (
                        <Button component="label" style={{ color: '#fff' }}>
                            Upload Photo
                            <input type="file" hidden onChange={(e) => onPhotoSelected(e)} />
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} sm={8}>
                    {editMode ? (
                        <ProfileDataForm profile={profile} onSubmit={onSubmit} />
                    ) : (
                        <ProfileData profile={profile} isMe={isMe} goToEditMode={() => setEditMode(true)} />
                    )}
                    <ProfileStatus />
                </Grid>
            </Grid>
            {isModalOpen && (
                <div className={s.modalOverlay} onClick={toggleModal}>
                    <div className={s.modalContent}>
                        <img src={profile.photos.large || profile.photos.small || userPhoto} className={s.modalPhoto} alt="ava" />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileData = ({ profile, isMe, goToEditMode }) => {
    return (
        <div>
            {isMe && (
                <div style={{ marginBottom: "15px" }}>
                    <Button variant="contained" color="primary" onClick={goToEditMode}>
                        Edit
                    </Button>
                </div>
            )}
            <div style={{ marginBottom: "15px" }}>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div style={{ marginBottom: "15px" }}>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob && (
                <div style={{ marginBottom: "15px" }}>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            )}
            <div style={{ marginBottom: "15px" }}>
                <b>About me:</b> {profile.aboutMe}
            </div>
        </div>
    );
};

export default ProfileInfo;
