import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import style from '../../common/FormsStyle/FormsStyle.module.css';

const ProfileForm = ({ profile, onSubmit }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: '#aaabaa', color: '#ffffff', maxWidth: '400px', margin: '10px auto'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Edit Profile</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register('fullName', { required: 'Required field' })}
                        defaultValue={profile?.fullName}
                        error={!!errors?.fullName}
                        helperText={errors?.fullName?.message || ' '}
                        fullWidth
                        size="small"
                        label="Full Name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox {...register('lookingForAJob')} defaultChecked={profile?.lookingForAJob} />}
                        label="Looking for a job"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register('lookingForAJobDescription', { required: 'Required field' })}
                        defaultValue={profile?.lookingForAJobDescription}
                        error={!!errors?.lookingForAJobDescription}
                        helperText={errors?.lookingForAJobDescription?.message || ' '}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        label="Professional Skills"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register('aboutMe', { required: 'Required field' })}
                        defaultValue={profile?.aboutMe}
                        error={!!errors?.aboutMe}
                        helperText={errors?.aboutMe?.message || ' '}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        label="About Me"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Contacts</Typography>
                </Grid>
                {Object.keys(profile.contacts).map((key) => (
                    <Grid item xs={12} md={6} key={key}>
                        <TextField
                            {...register(`contacts.${key}`)}
                            defaultValue={profile?.contacts[key]}
                            fullWidth
                            size="small"
                            label={key}
                            variant="outlined"
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProfileForm;
