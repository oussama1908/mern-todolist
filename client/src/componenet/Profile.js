import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/userSlices';
import AddTask from './AddTask';
import { Task } from './Task';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound'; // Import the NotFound component
import "../componentstyles/profile.css"

const Profile = () => {
  const { isAuth, userdata } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userdata.name || '');
  const [password, setPassword] = useState('');

  const userNameRef = useRef(userdata.name);

  useEffect(() => {
    if (!isAuth) {
      navigate('/not-found');
    } else {
      // Update the local state with the user's name from Redux state
      setName(userdata.name || '');
    }
  }, [isAuth, userdata.name]);

  const handleUpdate = () => {
    // Update the local state
    setName(userNameRef.current);

    // Dispatch the updateUser action
    dispatch(updateUser({ name, password }));
  };
  const storedUserData = localStorage.getItem("userData");
  const storedUserName = storedUserData ? JSON.parse(storedUserData).name : '';
  return (
    <div className='backgruond'>
      <div className='headerprofile'>
      <h1>Profile</h1>
      <p>Welcome, {storedUserName}!</p>
      </div>
      <div className='addtask'>
      <AddTask />

      </div>
      <div className='task'>
      <Task />
      </div>
      
    </div>
  );
};

export default Profile;
