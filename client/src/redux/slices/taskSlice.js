import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"
import { logout } from './userSlices'; // Import the logout action from the userSlice


export const  addtask=createAsyncThunk("/api/addtask",async(data,{rejectWithValue,dispatch})=>{
    try {
        const res= await axios.post("/task/post",data,{
            headers:{token:localStorage.getItem("token")}
        })
        console.log(res)
        dispatch(gettask())
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})

export const  gettask=createAsyncThunk("/api/gettask",async(data,{rejectWithValue})=>{
    try {
        const res= await axios.get("/task/get",{
            headers:{token:localStorage.getItem("token")}
        })
        console.log(res)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})
export const deletetask = createAsyncThunk('/api/deletetask', async (taskId, { rejectWithValue ,dispatch}) => {
    try {
        console.log('Deleting task with ID:', taskId);

      const res = await axios.delete(`/task/del/${taskId}`, {
        headers: { token: localStorage.getItem('token') }
      });
      console.log(res);
      dispatch(gettask())
      return res.data;
    } catch (error) {
        console.error('Error deleting task:', error);

      return rejectWithValue(error.response.data.msg);
    }
  });
  
 
  export const updateTask = createAsyncThunk('/api/updatetask', async (taskData, { rejectWithValue, dispatch }) => {
    try {
      const { taskId, title, description, status,deadline,priority, token } = taskData; // Include status in the payload
      console.log('status:', status);
  
      const res = await axios.put(`/task/put/${taskId}`, { title, description,deadline, status ,priority}, {
        headers: { token },
      });
      console.log(res);
      dispatch(gettask());
      return res.data;
    } catch (error) {
      console.error('Error updating task:', error);
      return rejectWithValue(error.response.data.msg);
    }
  });
  


  
  
    const taskSlice=createSlice({
    name:"task",
    initialState:{
        userdata:[],
        isLoading:false,
        error:null,
    },
   
    extraReducers:{
        [addtask.pending]:(state)=>{
            state.isLoading=true

        },
        [addtask.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.error=null
            
        },
        [addtask.rejected]:(state,action)=>{
            state.isLoading=false
           
state.error = action.payload;        },[gettask.pending]:(state)=>{
            state.isLoading=true

        },
        [gettask.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.userdata=action.payload.tasks
            
        },
        [gettask.rejected]:(state,action)=>{
            state.isLoading=false
           
            state.error=action.payload.error
        },
        [deletetask.pending]: (state, action) => {
            console.log('Deletetask is pending. Payload:', action.payload);
            state.isLoading = true;
        },
        [deletetask.fulfilled]: (state, action) => {
            console.log('Deletetask is fulfilled. Payload:', action.payload);
            state.isLoading = false;
            state.error = null;
        
            // Filter out the deleted task from the user data
            // const deletedTaskId = action.meta.arg; // Get the task ID from action.meta.arg
            // state.userdata = state.userdata.filter(task => task._id !== deletedTaskId);
            
        },
        
        [deletetask.rejected]: (state, action) => {
            console.log('Deletetask is rejected. Payload:', action.payload);
            state.isLoading = false;
            state.error = action.payload;
        },
        [updateTask.pending]: (state) => {
            state.isLoading = true;
          },
          [updateTask.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            
            // Update the user data with the updated task
            const updatedTask = action.payload.updatedTask;
            state.userdata = state.userdata.map(task =>
              task._id === updatedTask._id ? updatedTask : task
            );
          },
          [updateTask.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            
          },
          [logout]: (state) => {
            // Clear task-related data when logging out
            state.userdata = [];
          },
    }
})

export default taskSlice.reducer
