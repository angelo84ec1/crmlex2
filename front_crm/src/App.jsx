import React, { Suspense, lazy } from 'react'
import './App.css'
const Login = lazy(() => import('./Screens/AuthScreens/Login'));
const ForgetPassword = lazy(() => import('./Screens/AuthScreens/ForgetPassword'))
const ResetPassword = lazy(() => import('./Screens/AuthScreens/ResetPassword'))
const SignUp = lazy(() => import('./Screens/AuthScreens/SignUp'))

import {
  HashRouter as Router,
  Routes,
  Route,

} from "react-router-dom"
import Sidebar from './Components/Sidebar/Sidebar'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './Redux/authReducer'
import { fetchDashboard } from './Redux/dashboardReducer'
import { fetchTasks} from './Redux/taskReducer'
import { fetchCustomers } from './Redux/customerReducer'
import { fetchProjectTasks } from './Redux/taskReducer'
import { fetchUsers } from './Redux/userReducer'
import { getSchedule } from './Redux/userReducer'
import { fetchGanttChart } from './Redux/dashboardReducer'
import { fetchNotifications } from './Redux/dashboardReducer'
import { ThemeProvider, createTheme } from '@mui/material'
import Loader from './Components/Loader';
function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.Auth)

  React.useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const user = JSON.parse(localStorage.getItem('user'))
  React.useEffect(() => {
    if (user != null) {

      dispatch(fetchCustomers((user.user_id)))
      dispatch(getUser())
      dispatch(fetchProjectTasks(user.user_id))
      dispatch(fetchDashboard(user.user_id))
      // dispatch(fetchTasks(user.user_id))
      // dispatch(fetchTasks({ user_id: user.user_id, page: 0 }));
      dispatch(getSchedule(user.user_id))
      dispatch(fetchNotifications(user.user_id))
      dispatch(fetchGanttChart(user.user_id))
    }

  }, [isAuthenticated])
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8E2DE2', // your primary color
      },
    },
  });


  return (
    <React.Fragment>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Loader />}>

            <Router>
              <Routes>

                <Route path='/*' element={<Sidebar />} />
                <Route index path='login' element={<Login />} />
                <Route path='signUp' element={<SignUp />} />
                <Route path='forgetPassword' element={<ForgetPassword />} />
                <Route path="resetPassword/:resetToken/:email" element={<ResetPassword />} />
              </Routes>

            </Router>
          </Suspense>
        </ThemeProvider>
      </ErrorBoundary>
    </React.Fragment>
  )
}

export default App
