import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/userSlices';
import { useNavigate } from 'react-router-dom';
import "../componentstyles/register.css"

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Declare state variables here
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState(''); // Add this line to declare the name state

  const myname = useRef();
  const myemail = useRef();
  const mypassword = useRef();

  const handleUser = async () => {
    const enteredName = myname.current.value;
    const email = myemail.current.value;
    const password = mypassword.current.value;

    // Check if the email is valid
    if (!isValidEmail(email)) {
      setErrorMessage('Email must contain "@gmail.com"');
      return;
    }

    // Clear previous error message
    setErrorMessage('');

    // Dispatch register action
    const result = await dispatch(register({ name: enteredName, email, password }));

    // Check the result to handle email already in use
    if (result.error) {
      // Handle registration error...
      if (result.error.message.includes('This email is already in use')) {
        setErrorMessage('User with this email already exists. Please use a different email.');
      } else {
        // Handle other registration errors if needed
        setErrorMessage('User with this email already exists');
      }
    } else {
      // Update local state with the user's name
      setName(enteredName);
    }
  };

  const isValidEmail = (email) => {
    return /\@gmail\.com$/.test(email);
  };

  const redirectToLogin = () => {
    navigate('/login');
    window.location.reload(); // Reload the page

  };

  useEffect(() => {
    if (isAuth) {
      navigate('/profile');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    // Update error message when error changes
    if (error && error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('');
    }
  }, [error]);

  return (
    <div className="nav">
      <div className="login-container">
        <div className="loginresponse">
          Register:
          {errorMessage && <div className="errormsg">{errorMessage}</div>}
        </div>
        <input type="text" placeholder="Your name..." ref={myname} />
        <input type="email" placeholder="Your email..." ref={myemail} />
        <input type="password" placeholder="Your password..." ref={mypassword} />
        <button onClick={handleUser} className="facebook-button btn">
          Register
        </button>

        <button onClick={redirectToLogin} className="login-button">
          Login
        </button>

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Register;
