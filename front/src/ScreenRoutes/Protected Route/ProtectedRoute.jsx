import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Login from '../../Screens/AuthScreens/Login'
export default function ProtectedRoute({ Component }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, user } = useSelector(state => state.Auth)
    React.useEffect(() => {
        // console.log(user.role)
        // !isAuthenticated && navigate('/login')
        if (location.pathname === '/Users' || location.pathname === '/Inbox' || location.pathname === '/Contacts') {

            user.role != 'Administrador' && navigate('/')
        }
        if (location.pathname === '/Contacts' && user.role === 'Supervisor') {
            navigate('/Contacts')
        }
        // if(location.pathname==='/Contacts'&&user.role==='Digitador'){
        //     navigate('/Contacts')
        // }

    }, [isAuthenticated, location.pathname])
    return (
        <>{
            isAuthenticated ? <Component /> : !isAuthenticated && navigate('/login')&&<Login />
        }

            {/* {isAuthenticated ? <Component />
                : navigate('/loign')
            } */}

        </>
    )
}