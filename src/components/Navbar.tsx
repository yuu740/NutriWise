'use client'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/navbar.css'
import { ApiService } from "../constant/ApiService";
import getUserData from "../utils/getUserData";
import { UserData } from "../interface/User";


const Navbar = () => {
   const [userData, setUserData] = useState<UserData>({}); 


  useEffect(() =>{
    const user = getUserData() as UserData;
    if (user) {
      setUserData(user);
    }
  }, []);


  const navigate = useNavigate();

  const handleLogout = async () => {
    await ApiService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">NUTRIWISE</h1>
        <ul className="navbar-menu">
          <li>
            <Link to="/calculator" className="navbar-link">Calculator</Link>
          </li>
          <li>
            <Link to="/food-list" className="navbar-link">Food List</Link>
          </li>
          <li>
            <Link to="/recipe" className="navbar-link">Recipe</Link>
          </li>

          {userData ? (
            <>
              <li>
                <span className="navbar-link">Hi, {userData?.name}</span>
              </li>
              <li>
                <Link to="#" onClick={handleLogout} className="navbar-link">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;
