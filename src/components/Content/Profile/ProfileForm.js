import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(2),
        color: 'white',
    },
    error: {
        color: 'red',
    },
}));

const ProfileForm = ({ profile, onSubmit }) => {
    const classes = useStyles();
    const { handleSubmit, register, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </div>
            <div style={{ marginTop: "10px" }} >
                <b>Full name:</b>
                <TextField
                    {...register('fullName', { required: 'Required field' })}
                    defaultValue={profile?.fullName}
                    error={!!errors.fullName}
                    InputProps={{ style: { color: 'white' } }}
                />
                {errors.fullName && <span className={classes.error}>{errors.fullName.message || 'Error!'}</span>}
            </div>

            <div>
                <b>Looking for a job:</b>
                <FormControlLabel
                    control={<Checkbox {...register('lookingForAJob')} defaultChecked={profile?.lookingForAJob} />}
                    label="Looking for a job"
                />
            </div>
            <div>
                <b>My professional skills:</b>
                <TextField
                    {...register('lookingForAJobDescription', { required: 'Required field' })}
                    defaultValue={profile?.lookingForAJobDescription}
                    error={!!errors.lookingForAJobDescription}
                    multiline
                    InputProps={{ style: { color: 'white' } }}
                />
                {errors.lookingForAJobDescription && (
                    <span>{errors.lookingForAJobDescription.message || 'Error!'}</span>
                )}
            </div>
            <div>
                <b>About me:</b>
                <TextField
                    {...register('aboutMe', { required: 'Required field' })}
                    defaultValue={profile?.aboutMe}
                    error={!!errors.aboutMe}
                    multiline
                    InputProps={{ style: { color: 'white' } }}
                />
                {errors.aboutMe && <span className={classes.error}>{errors.aboutMe.message || 'Error!'}</span>}
            </div>
            <div>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map((key) => (
                    <div key={key}>
                        <b>{key}:</b>
                        <TextField
                            {...register(`contacts.${key}`)}
                            defaultValue={profile?.contacts[key]}
                            InputProps={{ style: { color: 'white' } }}
                        />
                    </div>
                ))}
            </div>
        </form>
    );
};

export default ProfileForm;
