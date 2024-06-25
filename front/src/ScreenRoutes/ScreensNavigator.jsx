import React,{lazy} from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './Protected Route/ProtectedRoute'
// import Dashboard from '../Screens/Dashboard/Dashboard'
const Dashboard=lazy(()=>import('../Screens/Dashboard/Dashboard'))
const Projects=lazy(()=>import('../Screens/Projects/Projects'))
const Contacts=lazy(()=>import('../Screens/Contacts/Contacts'))
const Tasks=lazy(()=>import('../Screens/Tasks/Tasks'))
const Inbox=lazy(()=>import('../Screens/Inbox/Inbox'))
const Calender=lazy(()=>import('../Screens/Calenders/Calender'))
const Users=lazy(()=>import('../Screens/Users/Users'))
const Resumen=lazy(()=>import('../Screens/Resumen/Resumen'))
export default function ScreensNavigator() {
  return (
    <React.Fragment>
      <Routes path="/">
        <Route index element={<ProtectedRoute Component={Dashboard} />} />
        <Route path='Projects' element={<ProtectedRoute Component={Projects} />} />
        <Route path='Contacts' element={<ProtectedRoute Component={Contacts} />} />
        <Route path='Tasks' element={<ProtectedRoute Component={Tasks} />} />
        <Route path='Inbox' element={<ProtectedRoute Component={Inbox} />} />
        <Route path='Calender' element={<ProtectedRoute Component={Calender} />} />
        <Route path='Users' element={<ProtectedRoute Component={Users} />} />
        <Route path='Resumen' element={<ProtectedRoute Component={Resumen} />} />

      </Routes>
    </React.Fragment>
  )
}
