import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// console.log(process.env.REACT_APP_BASE_URL)


//  export const loginUser = createAsyncThunk("loginUser", async () => {
//     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hotel/api/pro_api.php`);
//     // return response.json();
//     console.log(response.data)
// });

export const loginUser = createAsyncThunk(
    'loginUser',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            // const response = await axios.get(`https://link.inposizione.it/admin/api/login.php?type=logininfo&username=${user.email}&password=${user.password}&role=articolisti`, {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/login`, {
                email: params.email,
                password: params.password
            });
// console.log(response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const forgetPassword = createAsyncThunk(
    'forgetPassword',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            // const response = await axios.get(`https://link.inposizione.it/admin/api/login.php?type=logininfo&username=${user.email}&password=${user.password}&role=articolisti`, {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/password/forget`, {
                email: params.email,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const resetPassword = createAsyncThunk(
    'resetPassword',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            // const response = await axios.get(`https://link.inposizione.it/admin/api/login.php?type=logininfo&username=${user.email}&password=${user.password}&role=articolisti`, {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/password/reset`, {
                email: params.email,
                token: params.token,
                password: params.password,
                password_confirmation: params.password_confirmation,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const registerUser = createAsyncThunk(
    'registerUser',
    async (params, thunkAPI) => {
        // console.log(params)
        try {
            // const response = await axios.get(`https://link.inposizione.it/admin/api/login.php?type=logininfo&username=${user.email}&password=${user.password}&role=articolisti`, {
            const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/register`, {
                email: params.email,
                password: params.password,
                name: params.name,
                phone: params.phone,
                role:params.role

            });
            return response.data;
        } catch (error) {
            // console.log(error.response.data)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// export const addFilter = createAction('Filter')

const initialState = {
    user: '',
    status: 'idle',
    regStatus: 'idle',
    error: null,
    registerError: null,
    isAuthenticated: false,
    message: ''

}


const authSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // filterProducts:
        //   (state, action) => {
        //     if (action.payload === 'All') {
        //       state.filteredPro = state.products
        //     }
        //     else {
        //       state.filteredPro = state.products.filter(item => item.categories_name === action.payload)
        //     }


        //   }
        getUser:
            (state, action) => {
                const user = JSON.parse(localStorage.getItem('user'))
                if (user != null) {

                    state.isAuthenticated = true
                    state.user = user
                    // console.log(user)
                }
                // loginUser()
            },

        resetError:
            (state, action) => {
                state.error = null
                state.message=''
            },
        LoginUs:
            (state, action) => {
                state.isAuthenticated = true
            },
        LogoutUs:
            (state, action) => {
                localStorage.removeItem('user')
                state.isAuthenticated = false
            },

    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            // console.log(action.payload)
            state.user = action.payload.data;
            action.payload.success != 0 ?
                state.isAuthenticated = true
                : state.error = action.payload.message
            localStorage.setItem('user', JSON.stringify(action.payload.data))
            state.status = 'idle'
        },
        [loginUser.rejected]: (state, action) => {
            // console.log(action.payload)
            state.status = 'failed';
            state.error = action.payload.message;
            // state.status = 'idle';
        },
        [registerUser.pending]: (state, action) => {
            state.regStatus = 'loading';
        },
        [registerUser.fulfilled]: (state, action) => {
            state.regStatus = 'succeeded';
            // console.log(action.payload)
            state.message = action.payload.message;

            state.regStatus = 'idle'
        },
        [registerUser.rejected]: (state, action) => {
            // console.log(action.payload)
            state.regStatus = 'failed';
            state.error = action.payload;
            // state.status = 'idle';
        }
    }
});

export const { getUser, resetError, LoginUs, LogoutUs } = authSlice.actions
export default authSlice.reducer

