import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"
export const  register=createAsyncThunk("/api/register",async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post("/registre",data)
        console.log(res)
       
        return res.data
    } catch (error) { if (error.response && error.response.data && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    } else {
      return rejectWithValue("An error occurred during registration.");
    }
  }
})
export const  login=createAsyncThunk("/api/login",async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post("/login",data)
        return res.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue("An error occurred during login.");
      }
    }
})
export const updateUser = createAsyncThunk('/api/updateUser', async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put('/updateUser', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  });
  
    const userSlice=createSlice({
    name:"user",
    initialState:{
        userdata:{},
        isLoading:false,
        error:null,
        token:localStorage.getItem("token")|| null,
        isAuth: localStorage.getItem("isAuth")|| false
    },
    reducers:{
         logout:(state)=>{
            
            state.isAuth=false
            state.token=null
            localStorage.removeItem("isAuth")
            localStorage.removeItem("token")
            localStorage.removeItem("userData"); // Clear the user data from localStorage


         },
         clearUser: (state) => {
            // Clear all user-related data
            state.isAuth = false;
            state.token = null;
            state.userdata = {};
            localStorage.removeItem('isAuth');
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
          },
    },
    extraReducers:{
        [register.pending]:(state)=>{
            state.isLoading=true

        },
        [register.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.token=action.payload.token
            state.isAuth=true
            state.userdata = action.payload.msg; // Include the user's name

            localStorage.setItem("isAuth",state.isAuth)
            localStorage.setItem("token",state.token)
            localStorage.setItem("userData", JSON.stringify(state.userdata));
        },
        [register.rejected]:(state,action)=>{
            state.isLoading=false
            state.token=null
            state.isAuth=false
            state.error=action.error
        },
        [login.pending]:(state)=>{
            state.isLoading=false

        },
        [login.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.token=action.payload.token
            state.isAuth=true
            state.userdata = action.payload.user; // Include the user's name

            localStorage.setItem("isAuth",state.isAuth)
            localStorage.setItem("token",state.token)
            localStorage.setItem("userData", JSON.stringify(state.userdata));

        },
        [login.rejected]: (state, action) => {
          state.isLoading = false;
          state.token = null;
          state.isAuth = false;
          console.error('Error received from server:', action); // Log the entire action object
        
          // Check if the payload is a string and set it as the error message
          state.error = { message: typeof action.payload === 'string' ? action.payload : 'Login failed. Please try again.' };
        },
        
        
        
        
        
        
        
        [updateUser.pending]: (state) => {
            state.isLoading = true;
          },
          [updateUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            // Update the state with the new user data if needed
            state.userdata = { ...state.userdata, ...action.payload.user };
        },
          [updateUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
          },
    }
})

export default userSlice.reducer
export const { logout,clearUser } = userSlice.actions; 
