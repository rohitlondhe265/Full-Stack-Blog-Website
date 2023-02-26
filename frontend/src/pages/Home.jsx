import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from '../axios';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const cat = useLocation().search;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/${cat}`);
      setPosts(res.data);
    } catch (error) {
      setError(error);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  useEffect(() => {
    fetchData()
  }, [cat]);

  return (
    <section className="text-gray-600 flex flex-wrap">

      {posts.slice(0, 12).map((post) => {
        const { id, title, description, thumbnail, created_at, category } = post;
        return (
          <div key={id} className=" p-2 md:p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={`../upload/${thumbnail}`} alt="blog" />
              <div className="p-6">
                <span className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 capitalize">{category}</span>
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
  )
}

export default Home