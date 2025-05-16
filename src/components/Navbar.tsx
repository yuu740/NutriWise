import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">NUTRIWISE</h1>
        <ul className="navbar-menu">
          {[
            { name: "Calculator", path: "/calculator" },
            { name: "Food List", path: "/food-list" },
            { name: "Recipe", path: "/recipe" },
            { name: "Login", path: "/login" },
            { name: "Register", path: "/register" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="navbar-link"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;
