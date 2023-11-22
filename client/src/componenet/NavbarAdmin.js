import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/userSlices'; 
import "../componentstyles/navbarstyle.css"
const Navbar = () => {
  const { isAdmin } = useSelector((state) => state.admi);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar-left">
      {isAdmin ? (
        <>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
