import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"
export const  LoginAdmi=createAsyncThunk("/LoginAdmin",async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post("/admin/login",data)
        console.log(res)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.msg)
    }
})
export const getUsers = createAsyncThunk('/admin/allUsers', async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      console.log('Fetching users...'); // Log that the request is being made
      const res = await axios.get('/admin/getusers', {headers: { token: localStorage.getItem('token') }});
      console.log('Received users data:', res.data); // Log the response data
      return res.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return rejectWithValue(error.response.data.msg);
    }
  });

  export const deleteUser = createAsyncThunk('admin/deletetasks', async (id, { rejectWithValue ,dispatch}) => {
    try {
      const res = await axios.delete(`/admin/delete/${id}`, {headers:{token:localStorage.getItem('token')}});
      dispatch(getUsers())
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

const login=createSlice({
    name:"user",
    initialState:{
        admindata:{},
        isLoading:false,
        error:null,
        token:localStorage.getItem("token")|| null,
        isAdmin: localStorage.getItem("isAdmin")|| false,
        USER:[],
        TASK:[]
    },
    reducers:{
         logout:(state)=>{
            
            state.isAdmin=false
            state.token=null
            localStorage.removeItem("isAdmin")
            localStorage.removeItem("token")

         }
    },
    
    extraReducers:{
        [LoginAdmi.pending]:(state)=>{
            state.isLoading=true

        },
        [LoginAdmi.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.token=action.payload.token
            state.isAdmin=true
            localStorage.setItem("isAdmin",state.isAdmin)
            localStorage.setItem("token",state.token)
        },
        [LoginAdmi.rejected]:(state,action)=>{
            state.isLoading=false
            state.token=null
            state.isAdmin=false
            state.error=action.error
        },
        [getUsers.pending]: (state) => {
            state.isLoading = true;
          },
          [getUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.USER = action.payload.users; // Assuming the response has a "users" property
          },
          [getUsers.rejected]: (state, action) => {
            state.isLoading = false;
      state.token = null;
      state.isAdmin = false;
      state.error = action.payload.error;
          },
          [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isAdmin = false;
      state.error = action.payload.error;
    },
    }
})

export default login.reducer
export const { logout } = login.actions; 
