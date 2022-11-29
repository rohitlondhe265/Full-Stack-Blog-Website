import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (

    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto gap-3">
          <Link className="link" to="/?cat=catagory1">
            <h6>Category 1</h6>
          </Link>
          <Link className="link" to="/?cat=catagory2">
            <h6>Category 2</h6>
          </Link>
          <Link className="link" to="/?cat=catagory3">
            <h6>Category 3</h6>
          </Link>
          <Link className="link" to="/?cat=catagory4">
            <h6>Category 4</h6>
          </Link>
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <img className="w-12" src={Logo} alt="" />
          <span className="ml-3 text-xl">Developer Blog</span>
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 gap-3 justify-center items-center">
          <span>Current User</span>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            {currentUser ? (<span onClick={logout}>Logout</span>) : (
              <Link className="link" to="/login">
                Login
              </Link>)} </button>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <Link className="link" to="/write">
              Write
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
