import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../redux/profileReducer';


const MyPosts = () => {
    const posts = useSelector((state) => state.profilePage.posts);

    const dispatch = useDispatch();

    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        dispatch(addPost(data.newPostText))
        reset();
    };

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
                <AddNewPostForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
                <div className={s.posts}>
                    {posts.map(d => <Post key={d.id} message={d.message} likes={d.likes} />)}
                </div>
            </div>
        </div>
    );
}


const AddNewPostForm = ({ onSubmit, register, errors }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <textarea
                    {...register("newPostText", { required: "field is required", maxLength: 10 })}
                    placeholder="New message"
                />
                {errors.newPostText && errors.newPostText.type === "required" && (
                    <span className={s.error}>{errors?.newPostText?.message || "Error!"}</span>
                )}
                {errors.newPostText && errors.newPostText.type === "maxLength" && (
                    <span className={s.error}>{errors?.newPostText?.message || "Error!"}</span>
                )}

            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

export default MyPosts;
