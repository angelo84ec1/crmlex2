import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskReducer'
import authSlice from './authReducer'
import dashboardSlice from './dashboardReducer'
import customerReducer from './customerReducer'
import  userListSlice  from './userReducer'

export const store = configureStore({
  reducer: {
    TaskReducer: taskSlice,
    Customer: customerReducer,
    Auth: authSlice,
    Users: userListSlice,
    Dashboard:dashboardSlice
  },
})