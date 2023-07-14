import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Typography } from '@mui/material';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import { getStatus, getUserProfile, savePhoto, saveProfile } from '../../../redux/profileReducer';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileDataForm from './ProfileForm';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profilePage.profile);
    const userId = useSelector((state) => state.auth.userId);
    const isAuth = useSelector((state) => state.auth.isAuth);
    let { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [isMe, setIsMe] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!id && userId) {
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
            dispatch(savePhoto(e.target.files[0]));
            toggleModal();
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

    return (
        <Box>
            <Typography variant="h2" style={{ color: 'white', fontSize: '35px', textAlign: 'center', margin: '10px 0' }}>
                Profile
            </Typography>
            <Box className={s.descriptionBlock} textAlign="center">
                <Box mb={2}>
                    <img
                        src={profile.photos.large || profile.photos.small || userPhoto}
                        className={s.mainPhoto}
                        alt="ava"
                        onClick={toggleModal}
                    />
                </Box>
                {isMe && (
                    <Box mb={2}>
                        <Button variant="contained" component="label">
                            Upload Photo
                            <input type="file" accept="image/*" hidden onChange={onPhotoSelected} />
                        </Button>
                    </Box>
                )}
                {editMode ? (
                    <ProfileDataForm profile={profile} onSubmit={onSubmit} />
                ) : (
                    <ProfileData profile={profile} isMe={isMe} goToEditMode={() => setEditMode(true)} />
                )}
                <ProfileStatus />
            </Box>
            {isModalOpen && (
                <Box
                    className={s.modalOverlay}
                    onClick={toggleModal}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box className={s.modalContent}>
                        <img
                            src={profile.photos.large || profile.photos.small || userPhoto}
                            className={s.modalPhoto}
                            alt="ava"
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

const ProfileData = ({ profile, isMe, goToEditMode }) => {
    return (
        <Box mt={2}>
            {isMe && (
                <Box mb={2} textAlign="center">
                    <Button variant="contained" onClick={goToEditMode}>
                        Edit
                    </Button>
                </Box>
            )}
            <Typography variant="body1" mb={2}>
                <b>Full name:</b> {profile.fullName}
            </Typography>
            <Typography variant="body1" mb={2}>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </Typography>
            {profile.lookingForAJob && (
                <Typography variant="body1" mb={2}>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </Typography>
            )}
            <Typography variant="body1" mb={2}>
                <b>About me:</b> {profile.aboutMe}
            </Typography>
        </Box>
    );
};

export default ProfileInfo;
