"use client";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ApiService } from "../constant/ApiService";
import getUserData from "../utils/getUserData";
import { UserData } from "../interface/User";
import "../styles/navbar.css";
import Cookies from "js-cookie";

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUserData() as UserData;
    if (user && Cookies.get("token")) { 
      setUserData(user);
      setIsLoggedIn(true); 
    } else {
      setUserData(null);
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    Cookies.remove("token");
    setUserData(null);
    setIsLoggedIn(false); 
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  return (
    <>
      <div className="min-vh-100 bg-gradient bg-amber-50-to-amber-100">
        <header className="border-bottom bg-white shadow-sm">
          <div className="container d-flex h-16 align-items-center justify-content-between px-4">
            <h1 className="h4 font-weight-bold text-amber-600">
              <Link className="text-decoration-none orange-color-light fs-3" to="/">
                NutriWise
              </Link>
            </h1>

            <nav className="d-none d-md-flex gap-4">
              {[
                { path: "/calculator", label: "Calculator" },
                { path: "/food-list", label: "Food List" },
                { path: "/recipes", label: "Recipes" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={isLoggedIn ? path : "/login"}
                  className={`fs-5 nav-link-custom ${
                    isActive(path) ? "active" : ""
                  } ${!isLoggedIn ? "disabled-link" : ""}`}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault(); 
                      navigate("/login");
                    }
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="d-flex align-items-center">
              {userData && isLoggedIn ? (
                <div className="position-relative">
                  <div className="user-initial" onClick={toggleDropdown}>
                    {getInitials(userData?.name ?? "")}
                  </div>
                  <div
                    className={`dropdown-menu-custom ${
                      dropdownOpen ? "show" : ""
                    }`}
                  >
                    <div className="px-3 py-2">
                      <p className="mb-1 fw-medium">
                        Welcome, {userData?.name}
                      </p>
                    </div>
                    
                    <div
                      onClick={handleLogout}
                      className="dropdown-item-custom"
                      style={{ cursor: "pointer" }}
                    >
                      Log out
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="nav-login fs-5">
                    Login
                  </Link>
                  <Link to="/register" className="nav-register fs-5">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="container px-4 py-5">{children}</main>
      </div>
    </>
  );
};

export default Navbar;
