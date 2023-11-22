import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/userSlices";
import { useNavigate } from "react-router-dom";
import "../componentstyles/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.user);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  // State for managing error message
  const [errorMessage, setErrorMessage] = useState('');

  const handleUser = async () => {
    // Clear previous error message
    setErrorMessage('');
    console.log('Email:', email.current.value);
    console.log('Password:', password.current.value);
    const result = await dispatch(
      login({
        email: email.current.value,
        password: password.current.value,
      })
    );
    console.log(result); // Log the result to the console

    // Check the result to handle different error cases
    if (result.error) {
      if (result.error.message === 'This email does not exist') {
        setErrorMessage('This email does not exist.');
      } else if (result.error.message === 'Invalid password') {
        setErrorMessage('Invalid password. Please check your password and try again.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
    window.location.reload(); // Reload the page

  };

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    // Update error message when error changes
    console.log('Redux Error State:', error);
    if (error && error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
    }
  }, [error]);

  return (
    <div className="nav">
      <div className="login-container">
        <div className="login-inner">

        
        <div className="loginresponse">
          Login:
          {error && <div className="errormsg">{error.message}</div>}
        </div>

        <label>Email:</label>
        <input type="email" placeholder="Your email..." ref={email} />

        <label>Password:</label>
        <input type="password" placeholder="Your password..." ref={password} />

        <input
          type="submit"
          value="Login"
          className="facebook-button btn"
          onClick={handleUser}
        />

        <button onClick={redirectToRegister} className="register-button">
          Register
        </button>

        {isLoading && <p>Loading...</p>}
      </div>
      </div>
    </div>
  );
};

export default Login;
