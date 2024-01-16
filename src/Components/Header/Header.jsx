import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { AuthContext, FirebaseContext } from "../../context/Context";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          className="brandName"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span>ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {/* <span>{user?user.displayName:'Login'}</span> */}

          <span>
            {user ? (
              user.displayName
            ) : (
              <Link to={"/login"} className="custom-link">
                Login
              </Link>
            )}
          </span>
          {/* <Link to={'login'}>Login</Link> */}
          <hr />
        </div>
        {user && (
          <button
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  console.log("User signed out");
                  navigate("/login");

                  // You can perform any additional actions here, like redirecting to a different page.
                })
                .catch((error) => {
                  // An error occurred while signing out.
                  console.error("Error signing out:", error);
                });
            }}
          >
            Logout
          </button>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>
              <Link to={user ? "/create" : "/login"} className="custom-link">SELL</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
