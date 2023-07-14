import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Checkbox,
    TextField,
    Button,
    CircularProgress,
    makeStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "300px",
        width: "100%",
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    error: {
        color: "red",
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
    spinner: {
        color: theme.palette.primary.main,
    },
}));

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const isFetching = useSelector((state) => state.auth.isFetching);
    const [rememberMe, setRememberMe] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = ({ email, password }) => {
        dispatch(login({ email, password, rememberMe }));
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    }, [isAuth]);

    return (
        <div className={classes.container}>
            {isFetching ? (
                <CircularProgress className={classes.spinner} />
            ) : (
                <>
                    <Typography variant="h4" className={classes.title}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <TextField
                            {...register("email", { required: "Required field" })}
                            className={classes.input}
                            label="Email"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message || "Error!"}
                        />
                        <TextField
                            {...register("password", { required: "Required field" })}
                            className={classes.input}
                            label="Password"
                            variant="outlined"
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password?.message || "Error!"}
                        />
                        <FormControl>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...register("rememberMe")}
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            color="primary"
                                        />
                                    }
                                    label="Remember Me"
                                />
                            </FormGroup>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                        >
                            Submit
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;
