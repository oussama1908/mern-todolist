import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, logout } from "../redux/slices/userSlices";
import "../componentstyles/navbarstyle.css";

const Navbar = ({ type, userName }) => {
  const { isAuth } = useSelector((state) => state.user);
  const { isAdmin } = useSelector((state) => state.admi);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNameRef = useRef("");

  useEffect(() => {
    userNameRef.current = userName;
  }, [userName]);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="navbar-home">
      <div className="navbar-left">
        {isAuth && (
          <div  className="navbar-todo">
            TO DO LIST
          </div>
        )}
        {!isAuth && type !== "admin" && (
          <Link to="/" className="navbar-todo">
            To-Do List
          </Link>
        )}
        {isAdmin && (
          <Link to="/profileAdmin" className="navbar-todo">
            Admin Profile
          </Link>
        )}
      </div>
      <div className="navbar-right">
        {isAuth && (
          <>
            <span className="navbar-link">Signed in as: {userName}</span>
            <button
              onClick={handleLogout}
              className="navbar-link facebook-button"
            >
              Log out
            </button>
          </>
        )}
        {!isAuth && type !== "admin" && (
          <>
            <Link to="/login" className="navbar-link facebook-button">
              Login
            </Link>
            <Link to="/register" className="navbar-link facebook-button">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;