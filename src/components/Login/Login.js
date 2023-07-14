import {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import Preloader from "../common/Preloader/Preloader";

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const isFetching = useSelector((state) => state.auth.isFetching);

    const [rememberMe, setRememberMe] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = ({ email, password, rememberMe }) => {
        dispatch(login({email, password, rememberMe}));
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    }, [isAuth])


    return (
        isFetching ? <Preloader isFetching={isFetching} /> :
            <div className={style.login}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.wrapper}>
                        <label htmlFor="email">Email</label>
                        <input {...register("email", { required: "Required field" })} placeholder="Email" />
                        {errors?.email && <span className={style.error}>{errors?.email?.message || "Error!"}</span>}
                        <label htmlFor="password">Password</label>
                        <input {...register("password", { required: "Required field" })} type="password" placeholder="Password" />
                        {errors?.password && <span className={style.error}>{errors?.password?.message || "Error!"}</span>}

                        <label>
                            <input {...register("rememberMe")} checked={rememberMe} onChange={() => { setRememberMe(!rememberMe) }} type="checkbox" />
                            Remember Me
                        </label>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
    );
};


export default Login;