import axios from '../axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import edit from "../assets/edit.png";
import remove from "../assets/remove.png";


const SinglePost = () => {

    const [post, setPost] = useState({});

    const location = useLocation();

    const postId = location.pathname.split("/")[2];
    console.log(postId)

    const getPost = async ()=>{
        try {
            const res = await axios.get(`/posts/${postId}`);
            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(post)

    useEffect(()=>{
        getPost();
    }, []);

    return (<>

        <div className="md:container mx-auto pt-3 w-screen bg-gray-50">
                <div className="bg-gray-50">
                    <div className="flex justify-center items-center transition duration-200 ease-out transform hover:scale-110">
                        <img className="object-cover aspect-video w-3/5 h-96 shadow-sm" src={post.img} />
                    </div>
                    <div className="flex items-center justify-start p-8">
                        <a href="#" className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500">{post.cat}</a>
                    </div>
                    <div className="px-8">
                        <h1 className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500">{post.title}</h1>
                        <div className="font-light text-gray-600">

                            <a href="#" className="flex items-center mt-6 mb-6"><img
                                src={post.userImage}
                                alt="avatar" className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" />
                                <h1 className="font-bold text-gray-700 hover:underline">{post.username}</h1>
                                <div className='flex flex-row'> <Link to={`/write?edit=2`}> <img className='mx-3 h-9 cursor-pointer' src={edit} alt="" /> </Link>
                                    <img className='h-9 cursor-pointer' src={remove} />
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="text-2xl text-gray-700 mt-3 rounded bg-gray-100">
                        <div>
                            <p className="mt-2 p-8 leading-6">{post.description}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">Related Posts</h2>
                <div className="grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
                    <div className="grid grid-cols-12 col-span-12 gap-7">
                        <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                            <a href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
                                <img className="object-cover w-full shadow-sm h-full" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80" />
                            </a>
                            <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                                <div className="bg-indigo-400 absolute top-0 -mt-3 items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white">
                                    <span>Flask</span>
                                </div>
                                <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><a href="#">Oauth using facebook with flask,mysql,vuejs and tailwind css</a></h2>
                                <p className="mt-2 text-sm text-gray-500">Learn how to authenticate users to your application using facebook.</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </>
    )
}

export default SinglePost;