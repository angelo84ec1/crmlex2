import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';



export const fetchDashboard = createAsyncThunk(
  'fetchDashboard',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/dashboard/${params}`);
      // const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/dashboard/1`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchNotifications = createAsyncThunk(
  'fetchNotifications',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/notification/${params}`);
      // const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/dashboard/1`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//GANTT CHART
export const fetchGanttChart = createAsyncThunk(
  'fetchGanttChart',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/ganttchart/${params}`);
      // const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/dashboard/1`);
      // console.log(response.data)
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const addFilter = createAction('Filter')

const initialState = {
  latestProjects: [],
  dashboardData: {},
  ganttChart: [],
  status: 'idle',
  error: null,
  filteredPro: [],
  currency: '$',
  notifications: []
}


const dashboardSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetDashboard:
      (state, action) => {
        state.latestProjects = []
        state.dashboardData = []


      }
  },
  extraReducers: {
    [fetchDashboard.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchDashboard.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      if (state.dashboardData != []) {
        state.latestProjects = action.payload.latest_projects
        state.dashboardData = action.payload;
      }
      state.filteredPro = action.payload;
    },
    [fetchDashboard.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [fetchNotifications.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notifications = action.payload

    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [fetchGanttChart.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchGanttChart.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      
      state.ganttChart = action.payload
      .filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
      .filter((v, i, a) => a.findIndex(t => (t.name.split(" ")[0]+" "+t.name.split(" ")[1] === v.name.split(" ")[0]+" "+v.name.split(" ")[1])) === i)
      .map(obj => ({
        ...obj,
        start: new Date(obj.start),
        end: new Date(obj.end)
      }));
    },
    
    [fetchGanttChart.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  }
});

export const { resetDashboard } = dashboardSlice.actions
export default dashboardSlice.reducer
