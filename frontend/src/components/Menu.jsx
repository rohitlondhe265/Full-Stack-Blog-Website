import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/?category=${cat}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  useEffect(() => {
    fetchData();
  }, [cat]);

  return (
    // <div className="menu">
    //   <h1>Other posts you may like</h1>
    //   {posts.map((post) => (
    //     <div className="post" key={post.id}>
    //       <img src={`../upload/${post?.img}`} alt="thumbnail image" />
    //       <h2>{post.title}</h2>
    //       <button>Read More</button>
    //     </div>
    //   ))}
    // </div>
    <section className="flex flex-col w-full gap-2">

      {posts.slice(1, 4).map((post) => {
        const { id, title, description, thumbnail, created_at, category } = post;
        return (
          <div key={id} className="">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={`../upload/${thumbnail}`} alt="blog" />
              <div className="p-3">
                <span className="tracking-widest text-xs title-font font-medium text-gray-400 capitalize">{category}</span>
                <Link className="link" to={`/post/${id}`}>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                </Link>
                <p className="leading-relaxed mb-3">{getText(description.slice(0, 99))}</p>
                <div className="flex items-center flex-wrap ">
                  <Link className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer" to={`/post/${id}`}>Read More
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}

    </section>
  );
};

export default Menu;