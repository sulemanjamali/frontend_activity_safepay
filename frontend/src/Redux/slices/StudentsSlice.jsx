import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";
import { toast } from 'react-toastify';

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async(payload,thunkAPI)=>{
        try {
            const res = await axios.get("students");
            const data = await res.data;
            return data
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// export const getStudent = createAsyncThunk(
//     "students/getStudent",
//     async(payload,thunkAPI)=>{
//         try {
//             const res = await axios.get(`student/${payload.uuid}`);
//             const data = await res.data;
//             return data
//         } catch (error) {
//             thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

export const addStudents = createAsyncThunk(
    "students/addStudents",
    async(payload,thunkAPI)=>{
        try {
            const res = await axios.post("student",payload,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = await res.data;
            return data
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const editStudents = createAsyncThunk(
    "students/editStudents",
    async(payload,thunkAPI)=>{
        try {
            const res = await axios.put(`student/${payload.uuid}`,payload,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = await res.data;
            return data
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteStudents = createAsyncThunk(
    "students/deleteStudents",
    async(payload,thunkAPI)=>{
        try {
            
            const res = await axios.delete(`student/${payload.uuid}`);
            const data = await res.data;
            return data
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    students:[]
};

const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
    adduser:(state,action)=>{
        state.students.push(action.payload)
    },
     editUser:(state,action)=>{
     const index = state.students.findIndex(student => student.uuid === action.payload.uuid);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
        },
    deleteUser:(state,action)=>{
        console.log(action.payload)
        state.students = state.students.filter(student => student.uuid !== action.payload.uuid);
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getStudents.fulfilled,(state,action)=>{
            // console.log(action.payload)
            state.students = action.payload;
        })
        .addCase(addStudents.fulfilled,(state,action)=>{
            toast.success("student sucessfully created", {
                position: "top-center"
            });
        })
        .addCase(editStudents.fulfilled,(state,action)=>{
            // console.log("fulfilled",action.payload)
            toast.warning("student sucessfully edited", {
                position: "top-center"
            });
        })
        .addCase(deleteStudents.fulfilled,(state,action)=>{
            toast.error("student sucessfully deleted", {
                position: "top-center"
            });
        })
    }
});

export default studentSlice.reducer;
export const {editUser,deleteUser,adduser} = studentSlice.actions;
export const getUserList=(state) => state.student.students;