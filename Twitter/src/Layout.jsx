import React from "react";
import { Outlet, Link } from "react-router-dom";
import './styles.css'
const Layout = () => {
  return (
    <>
      <nav>
        {/* <ul className="navbar">
          <li>
            <Link to="/">SignIn</Link>
          </li>
          <li>
            <Link to="/HomePage">Homepage</Link>
          </li>
          <li>
            <Link to="/createPost">Create Post</Link>
          </li>
        </ul> */}
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;