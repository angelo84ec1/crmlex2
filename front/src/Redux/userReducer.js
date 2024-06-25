import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'fetchUsers',
    async (params, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/users`);
            // console.log(response)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


//ADD USER
export const addUser = createAsyncThunk(
    'addUser',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/users`, params,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            // console.log(response)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
//ADD USER
export const deleteUser = createAsyncThunk(
    'deleteUser',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/users/deleteuser/${params}`,)
            // console.log(response)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
//EDIT USER
export const editUser = createAsyncThunk(
    'editUser',
    async (params, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/users/edituser/${params.id}`, params.user,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
//EDIT USER
export const getSchedule = createAsyncThunk(
    'getSchedule',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/calendar/${params}`)
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);




const initialState = {
    userList: [],
    userStatus: '',
    delUserStatus: '',
    status: 'idle',
    currentUser: '',
    userSchedule: [],
    error: ''
}

export const userListSlice = createSlice({
    name: 'userListReducer',
    initialState,
    reducers: {
        //ADD USER
        addUserFun: (state, action) => {
            // console.log(action.payload)
            return {
                ...state,
                userList: [...state.userList, action.payload]
            }
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        deleteUserFun: (state, action) => {
            state.userList = state.userList.filter(user => user.id != action.payload.id)
        },
        editUserFun: (state, action) => {
            state.userList = state.userList.map((user) =>
              user.id === action.payload.id ? action.payload : user
            );
          }
          ,
        resetUser: (state) => {
            state.userStatus = ''
            state.delUserStatus = ''
            state.error = ''

        },

    },
    extraReducers: {

        [fetchUsers.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.userList = action.payload
        },
        [fetchUsers.rejected]: (state) => {
            state.status = 'failed';
            // state.error = action.payload;
        },
        // ADD user
        [addUser.pending]: (state) => {
            state.status = 'loading';
        },
        [addUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            // console.log(action.payload)
            state.userStatus = action.payload
        },
        [addUser.rejected]: (state, action) => {
            state.status = 'failed';
            // console.log(action.payload)
            state.error = action.payload;
        },
        // // EDIT user
        [editUser.pending]: (state,) => {
            state.status = 'loading';
        },
        [editUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.userStatus = action.payload
        },
        [editUser.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.payload)
            state.error = action.payload;
        },
        // Delete user
        [deleteUser.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.delUserStatus = action.payload
        },
        [deleteUser.rejected]: (state, action) => {
            state.status = 'failed';
            // console.log(action.payload)
            state.error = action.payload;
        },
        //  user scgdule
        [getSchedule.pending]: (state) => {
            state.status = 'loading';
        },
        [getSchedule.fulfilled]: (state, action) => {
            state.status = 'succeeded';

            const formattedEvents = action.payload.map((event) => ({
                event_id: parseInt(event.event_id),
                title: event.title,
                start: new Date(event.start.replace(/-/g, "/")),
                end: new Date(event.end.replace(/-/g, "/"))
            }));
            state.userSchedule = formattedEvents


            // state.userStatus = action.payload
        },
        [getSchedule.rejected]: (state, action) => {
            state.status = 'failed';
            // console.log(action.payload)
            state.error = action.payload;
        }


    },
})

// Action creators are generated for each case reducer function
export const { addUserFun, setCurrentUser, deleteUserFun, resetUser, editUserFun } = userListSlice.actions

export default userListSlice.reducer