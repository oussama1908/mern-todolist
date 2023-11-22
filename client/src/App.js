import './App.css';
import { Route, Routes } from 'react-router-dom'; 
import { useSelector } from 'react-redux';  // Import the useSelector hook

import Login from './componenet/Login'; 
import Profile from './componenet/Profile'; 
import Register from './componenet/Register'; 
import Navbar from './componenet/Navbar';
import LoginAdmin from './componenet/LoginAdmin';
import ProfileAdmin from './componenet/ProfileAdmin';
import { Task } from './componenet/Task';
import NavbarAdmin from "./componenet/NavbarAdmin";
import Home from './componenet/Home';  // Import the Home component
import NotFound from './componenet/NotFound';




function App() {
  // Fetch userdata from the Redux store
  const { userdata } = useSelector((state) => state.user);
  console.log('User Data:', userdata);
  const storedUserData = localStorage.getItem("userData");
  const storedUserName = storedUserData ? JSON.parse(storedUserData).name : '';

  return (
    <div className="App">
      <Routes>
        {/* Admin routes */}
        <Route
          path="/LoginAdmin"
          element={<><Navbar type="admin" /> <LoginAdmin /></>}
        />
        <Route
          path="/ProfileAdmin"
          element={<><Navbar type="admin" /> <ProfileAdmin /></>}
        />

        {/* User routes */}
        <Route
          index
          element={<><Navbar type="user" /> <Home /></>}
        />
        <Route
          path="/login"
          element={<><Navbar type="user" /> <Login /></>}
        />
        <Route
          path="/register"
          element={<><Navbar type="user" /> <Register /></>}
        />
        <Route
          path="/profile/"
          element={
            <>
              <Navbar type="user" userName={storedUserName} />
              <Profile />
            </>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;