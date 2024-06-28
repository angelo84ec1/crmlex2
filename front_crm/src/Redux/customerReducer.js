import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// console.log(process.env.REACT_APP_BASE_URL)


//  export const fetchCustomers = createAsyncThunk("fetchCustomers", async () => {
//     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hotel/api/pro_api.php`);
//     // return response.json();
//     console.log(response.data)
// });

export const fetchCustomers = createAsyncThunk(
  'fetchCustomers',
  async (params, thunkAPI) => {
    // console.log(params)
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/customerlist/${params}`, {
        params
      });
      // console.log(response)
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ADD CUSTOMER
export const addCustomer = createAsyncThunk(
  'addCustomer',
  async (params, thunkAPI) => {
    // console.log(params)

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/addcustomer`, {
        user_id: params.user_id,
        customer_name: params.name,
        customer_email: params.email,
        customer_company_name: params.companyName,
        customer_phone: params.phone,
        customer_forecast: params.forecast,
        recent_activity: params.acitvity,
        customer_pic: ""
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Update CUSTOMER
export const updateCustomer = createAsyncThunk(
  'updateCustomer',
  async (params, thunkAPI) => {
    // console.log(params)

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/editcustomer/${params.id}`, {
        user_id: params.user_id,
        customer_name: params.name,
        customer_email: params.email,
        customer_company_name: params.companyName,
        customer_phone: params.phone,
        customer_forecast: params.forecast,
        recent_activity: params.acitvity,
        customer_pic: "https://1000logos.net/wp-content/uploads/2016/11/Google-Logo-1998.jpg"
      });
      // console.log(response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// DELETE CUSTOMER
export const deleteCustomer = createAsyncThunk(
  'deleteCustomer',
  async (params, thunkAPI) => {
    // console.log(params)

    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/deletecustomer/${params}`);
      // console.log(response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



// export const addFilter = createAction('Filter')

const initialState = {
  customers: [],
  data: [],
  customersStatus: 'idle',
  addStatus: { message: '' },
  updateStatus: {},
  error: null,
  delStatus: {},
  currentCustomer: {}

}


const customerSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    resetStatus: (state) => {
      state.customersStatus = 'idle'
      state.addStatus = {}
      state.updateStatus = {}
      state.delStatus={}
    },
    addCustomerFun: (state, action) => {
      const newCustomer = action.payload;
      return {
        ...state,
        customers: [...state.customers, newCustomer]
      }
    },
    deleteCustomerFun: (state, action) => {
      // console.log(action.payload)
      const deletedCustomerId = action.payload.id;
      const updatedCustomers = state.customers.filter((customer) => customer.id !== deletedCustomerId);
      return {
        ...state,
        customers: updatedCustomers,
      };
    },
    updateCustomerFun: (state, action) => {
      // console.log(action.payload)
      const updatedCustomer = action.payload;
      const updatedCustomers = state.customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      );
      return {
        ...state,
        customers: updatedCustomers,
      };
    }

    ,

    setCurrentCustomer: (state, action) => {
      // console.log(action.payload)
      state.currentCustomer = action.payload
    },

  },
  extraReducers: {

    [fetchCustomers.pending]: (state) => {
      state.customersStatus = 'loading';
    },
    [fetchCustomers.fulfilled]: (state, action) => {
      state.customersStatus = 'succeeded';
      state.customers = action.payload;
    },
    [fetchCustomers.rejected]: (state, action) => {
      state.customersStatus = 'failed';
      state.error = action.payload;
    },
    // ADD CUSTOMER
    [addCustomer.pending]: (state) => {
      state.customersStatus = 'loading';
    },
    [addCustomer.fulfilled]: (state, action) => {
      state.customersStatus = 'succeeded';
      state.addStatus = action.payload
    },
    [addCustomer.rejected]: (state, action) => {
      state.customersStatus = 'failed';
      console.log(action.payload)
      state.error = action.payload;
    },
    // EDIT CUSTOMER
    [updateCustomer.pending]: (state) => {
      state.customersStatus = 'loading';
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.customersStatus = 'succeeded';
      state.updateStatus = action.payload
    },
    [updateCustomer.rejected]: (state, action) => {
      state.customersStatus = 'failed';
      console.log(action.payload)
      state.error = action.payload;
    },    // Delete CUSTOMER
    [deleteCustomer.pending]: (state) => {
      state.customersStatus = 'loading';
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.customersStatus = 'succeeded';
      state.delStatus = action.payload
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.customersStatus = 'failed';
      console.log(action.payload)
      state.error = action.payload;
    }

  }
});

export const { resetStatus, addCustomerFun, setCurrentCustomer, updateCustomerFun ,deleteCustomerFun} = customerSlice.actions
export default customerSlice.reducer

