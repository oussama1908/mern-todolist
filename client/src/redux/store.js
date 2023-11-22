import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlices';
import taskSlice from './slices/taskSlice'; 
import login from './slices/adminSlice'; 

export default configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice, 
    admi:login
  },
});
