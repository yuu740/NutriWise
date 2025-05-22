import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate();

   const handleCardClick = (e: React.MouseEvent, link: string) => {
    if (!isLoggedIn) {
      e.preventDefault(); 
      navigate("/login");
    } else {
      navigate(link); 
    }
  };
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 mb-3">Welcome to NutriWise</h1>
      <p className="lead mb-5">
        Your personal nutrition assistant to track food, calculate nutrients,
        and discover recipes based on what you have.
      </p>

      {!isLoggedIn && (
        <div
          className="p-4 border rounded mx-auto border-warning mb-5" 
          style={{
            maxWidth: "600px",
            backgroundColor: "#fffbeb",
          }}
        >
          <h4>Create an account to get started</h4>
          <p className="text-muted">
            Sign up to save your food inventory, track your nutritional goals, and
            get personalized recipe recommendations.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn bg-white text-dark border">
              Log in
            </Link>
            <Link to="/register" className="btn direct-button text-white">
              Create Account
            </Link>
          </div>
        </div>
      )}


      <div className="row mb-5 p-5">
        {[
          {
            title: "Track Food",
            text: "Keep track of your food inventory and get notified before items expire.",
            link: "/food-list",
            icon: (
              <>
                <path d="M14 22H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8" />
                <path d="M13.3 2H13v10h10V7.7" />
                <path d="m13 5.5 7.5 7.5" />
              </>
            ),
          },
          {
            title: "Calculate Nutrients",
            text: "Calculate the nutritional content of your meals and track your daily intake.",
            link: "/calculator",
            icon: (
              <>
                <path d="M12 22a9.7 9.7 0 0 0 7.18-3.2 9 9 0 0 0 2.32-6.8 9 9 0 0 0-1.5-4" />
                <path d="M12 22V8" />
                <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
              </>
            ),
          },
          {
            title: "Discover Recipes",
            text: "Find recipes based on the ingredients you already have in your food list.",
            link: "/recipes",
            icon: (
              <>
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" x2="18" y1="17" y2="17" />
              </>
            ),
          },
        ].map((card, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <div
                  className="card card-custom card-body icon-circle p-3 mb-4 d-inline-flex justify-content-center align-items-center"
                  style={{ borderRadius: "50%", width: "56px", height: "56px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-orange-500"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                 <div
                  onClick={(e) => handleCardClick(e, card.link)}
                  className={`btn direct-button text-white ${
                    !isLoggedIn ? "disabled" : ""
                  }`}
                  style={{ cursor: !isLoggedIn ? "not-allowed" : "pointer" }} // Tambahkan kursor
                >
                  {card.title === "Track Food"
                    ? "View Food List"
                    : card.title === "Calculate Nutrients"
                    ? "Open Calculator"
                    : "Browse Recipes"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
