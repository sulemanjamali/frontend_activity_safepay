import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";

const initialState = {
    user:null,
};

export const getStudent = createAsyncThunk(
    "students/getStudent",
    async(payload,thunkAPI)=>{
        try {
            console.log(axios.defaults.baseURL,payload)
            const res = await axios.get(`student/${payload.uuid}`);
            const data = await res.data;
            console.log(data)
            return data
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const studentSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
   
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getStudent.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.user = action.payload;
        })
    }
});


export default studentSlice.reducer;
export const getUser=(state) => state.user.user;