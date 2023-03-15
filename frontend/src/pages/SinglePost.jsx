import axios from '../axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from '../components/Menu';
import DOMPurify from 'dompurify';
import { AuthContext } from '../context/AuthContext'
import Edit from "../assets/edit.png";
import Remove from "../assets/remove.png";
import { useContext } from 'react';


const SinglePost = () => {

    const [post, setPost] = useState({});
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    console.log(post)

    const getPost = async () => {
        try {
            const res = await axios.get(`/posts/${postId}`);
            console.log(res.data)
            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    const { title, description, username, userImage, thumbnail, created_at, updated_at, category } = post;

    return (<div className='container mx-auto flex flex-col lg:flex-row gap-6 mt-3'>

        <main className="px-2 lg:px-9 bg-gray-100 space-y-3" style={{ flex: "5" }}>

            <p className='capitalize text-violet-600 text-xl font-semibold cursor-pointer'> <Link to={"/"}>Home</Link> &gt; <Link to={`/?category=${category}`}>{category}</Link></p>

            <img className='w-full pt-3 aspect-video object-cover object-center' src={`../upload/${thumbnail}`} alt="post image" />

            <div className="user flex items-center gap-6">
                <img className='h-12 w-12 rounded-full object-cover' src={userImage} alt="" />
                <div>
                    <span className='font-bold text-lg capitalize'>{username}</span>
                    <p>posted {created_at}</p>
                </div>
                {currentUser.username === username && (
                <div className="edit flex gap-5 flex-col lg:flex-row cursor-pointer">
                    <Link to={`/write?edit=${postId}`} state={post}>
                        <img src={Edit} className="w-6 lg:w-9" alt="" />
                    </Link>
                    <img onClick={handleDelete} src={Remove} className="w-6 lg:w-9" alt="" />
                </div>)}
            </div>
            <h1 className='text-3xl text-violet-600 font-bold'>{title}</h1>
            <article className="prose lg:text-xl"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}>
            </article>
        </main>

        <aside className="flex flex-col gap-6 bg-gray-100 px-3 py-3" style={{ flex: "2" }}>
            <h3 className='text-3xl text-violet-600 font-semibold'>Related Posts</h3>
            <Menu cat={category} />
        </aside>

    </div>)
}

export default SinglePost;