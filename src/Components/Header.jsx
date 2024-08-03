import { useContext } from "react";
import { logout } from "../Config";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../DataProvider";

const Header = () => {
  const { name } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="header-wrapper">
      <header className="header-container">
        <div className="logo">
          <h1>OLX</h1>
        </div>
        <div className="search-bar">
          <div className="location-input-container">
            <input type="text" placeholder="India" className="location-input" />
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            className="search-input"
          />
          <button type="button" className="search-button">
            <img src="src/assets/search.svg" alt="" />
          </button>
        </div>
        <div className="auth-buttons">
          <div className="language-select">
            <span>ENGLISH</span>
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
          <div>
            <h3>{name}</h3>
          </div>
          <button
            className="login-button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
          <button
            className="sell-button"
            onClick={() => {
              navigate("/sell");
            }}
          >
            + SELL
          </button>
        </div>
      </header>
      <nav>
        <ul className="categories">
          <li>
            <a href="#">ALL CATEGORIES</a>
          </li>
          <li>
            <a href="#">Cars</a>
          </li>
          <li>
            <a href="#">Motorcycles</a>
          </li>
          <li>
            <a href="#">Mobile Phones</a>
          </li>
          <li>
            <a href="#">For Sale: Houses & Apartments</a>
          </li>
          <li>
            <a href="#">Scooters</a>
          </li>
          <li>
            <a href="#">Commercial & Other Vehicles</a>
          </li>
          <li>
            <a href="#">For Rent: Houses & Apartments</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
