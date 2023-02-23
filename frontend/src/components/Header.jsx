import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/react.svg";
import {AuthContext} from "../context/AuthContext"

const Header = () => {

  const {logout, currentUser} = useContext(AuthContext);

  return (
      <header className="container mx-auto mt-2 lg:mt-3 text-gray-600 flex flex-wrap flex-col md:flex-row items-center">

        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto gap-3">
          <Link className="link" to="/?category=web">
            <h6>Web</h6>
          </Link>
          <Link className="link" to="/?category=java">
            <h6>Java</h6>
          </Link>
          <Link className="link" to="/?category=art">
            <h6>Art</h6>
          </Link>
          <Link className="link" to="/?category=dsa">
            <h6>DSA</h6>
          </Link>
        </nav>

        <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <Link to="/"><img className="w-9" src={Logo} alt="" /></Link>
          <span className="ml-3 text-xl">Developer Blog</span>
        </div>
        
        <div className="w-11/12 lg:w-2/5 flex justify-between lg:justify-end lg:gap-3 items-center">
          {currentUser && (<span className="order-2 lg:order-1 capitalize">hi ! {currentUser?.username}</span>)}
          <button className="inline-flex order-1 lg:order-3 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            {currentUser ? (<span onClick={logout}>Logout</span>) : (
              <Link className="link" to="/login">
                Login
              </Link>)} </button>
          <button className="inline-flex order-3 lg:order-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <Link className="link" to="/write">
              Write Post
            </Link>
          </button>
        </div>

      </header>
  );
};

export default Header;