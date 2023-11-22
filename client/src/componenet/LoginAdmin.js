import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmi } from '../redux/slices/adminSlice'; 
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Move this line into the component
  const { isAdmin } = useSelector((state) => state.admi);

  const handleLogin = () => {
    dispatch(LoginAdmi({ email: email.current.value, password: password.current.value }));
    navigate('/ProfileAdmin');
  };

  useEffect(() => {
    if (isAdmin) {
      navigate('/ProfileAdmin');
    }
  }, [isAdmin]);

  return (
    <div>
      <input type="email" placeholder='your email' ref={email} />
      <input type="password" placeholder='your password' ref={password} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginAdmin;
