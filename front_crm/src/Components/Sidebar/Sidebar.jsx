import React, { Suspense, lazy } from 'react'
import Img1 from '../../assets/images/Rectangle 17.png'
import Navbar from '../UseAble/Navbar'
// const ScreensNavigator=lazy(()=>import('../../ScreenRoutes/ScreensNavigator'))
import ScreensNavigator from '../../ScreenRoutes/ScreensNavigator'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogoutUs } from '../../Redux/authReducer'
import { useLocation } from 'react-router-dom'
import { resetDashboard } from '../../Redux/dashboardReducer'
import { resetTask } from '../../Redux/taskReducer'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import Loader from '../Loader'
export default function Sidebar() {
    
    const dispatch = useDispatch()
    const location = useLocation()
    const { t } = useTranslation()
    const { user } = useSelector(state => state.Auth)
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    // let btntog = document.querySelector('#btntog');
    // let sidebar = document.querySelector('.sidebar');
    // btntog.onClick = function () {
    //     sidebar.classList.toggle('open');
    // };

    const openSideBar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('open');
        setSidebarOpen(true)
        const mainCon = document.querySelector('.main-con');
        mainCon.style.left = '230px';
        mainCon.style.width = 'calc(100% - 240px)';
    }

    React.useEffect(() => {
        openSideBar()
    }, [])


    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
        setSidebarOpen(!sidebarOpen);

        const mainCon = document.querySelector('.main-con');
        if (sidebar.classList.contains('open')) {
            mainCon.style.left = '230px';
            mainCon.style.width = 'calc(100% - 240px)';
        } else {
            mainCon.style.left = '80px';
            mainCon.style.width = 'calc(100% - 90px)';
        }
    }
    
    return (
        <React.Fragment>
            <div >
                <div className="side_bar sidebar" style={{ overflow: "hidden" }}>
                    <div className="logos" style={{ marginLeft: '1rem' }}>

                        <Typography sx={{
                            fontSize: 26, fontWeight: 'bold', display: `${sidebarOpen ? 'block' : 'none'}`
                            , color: 'white'
                        }}>CRM</Typography>
                    </div>
                    <i className='bx bx-menu'

                        onClick={() => {
                            // let sidebar = document.querySelector('.sidebar');
                            // sidebar.classList.toggle('open');
                            toggleSidebar()

                        }}
                        id="btntog"></i>
                    <div className="user-details">

                        <img src={user.user_pic?user.user_pic:Img1} alt="Crm" />
                        <div className="ms-2">
                            <p>{user.name}</p>
                            <p style={{ color: 'white', wordBreak: 'break-all',paddingRight:'10px' }} className="mail">{user.email}</p>

                        </div>
                    </div>
                    <div className="sidebarlinks">
                        <ul>
                            <li >
                                <Link to="/"
                                    style={location.pathname === '/' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                > <i className='bx bx-category-alt '  ></i>
                                    <span className="nav-links">{t('dashboard')}</span></Link>
                            </li>
                            <li>
                                <Link to="Projects"
                                    style={location.pathname === '/Projects' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}

                                > <i className='bx bx-rectangle'></i>
                                    <span className="nav-links">{t('projects')}</span></Link>
                            </li>
                            <li style={{ display: `${user.role != 'Administrador' ? 'none' : 'block'}` }}>
                                <Link to="Inbox"
                                    style={location.pathname === '/Inbox' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                > <i className='bx bx-envelope'></i>
                                    <span className="nav-links"> {t('inbox')}</span></Link>
                            </li>
                            <li style={{ display: `${user.role === 'Cliente'||user.role === 'Assistant' ? 'none' : 'block'}` }}>
                                <Link to="Contacts"
                                    style={location.pathname === '/Contacts' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                ><i className='bx bx-user'></i>
                                    <span className="nav-links"> {t('contacts')}</span></Link>
                            </li>
                            <li style={{ display: `${user.role != 'Administrador' ? 'none' : 'block'}` }} >
                                <Link to="Tasks"
                                    style={location.pathname === '/Tasks' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                ><i className='bx bx-task'></i>
                                    <span className="nav-links">{t('tasks')}</span></Link>
                            </li>
                            <li >
                                <Link to="Resumen"
                                      style={location.pathname === '/Resumen' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                ><i className='bx bx-rectangle'></i>
                                    <span className="nav-links">{t('resumen')}</span></Link>
                            </li>

                            <li style={{ display: `${user.role != 'Administrador' ? 'none' : 'block'}` }} >

                                <Link to="Users"
                                    style={location.pathname === '/Users' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                ><i className='bx bxs-user'></i>
                                    <span className="nav-links">{t('users')}</span></Link>
                            </li>
                            <li>
                                <Link to="Calender"
                                    style={location.pathname === '/Calender' ? { background: "linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)", color: 'white' } : { backgroundColor: 'none' }}
                                ><i className='bx bx-calendar'></i>
                                    <span className="nav-links">{t('calender')}</span></Link>
                            </li>
                        </ul>
                        <ul className=" mt-5">
                            <li className="sidebar-logout"

                                onClick={() => {
                                    dispatch(resetDashboard())
                                    dispatch(LogoutUs())
                                    dispatch(resetTask())
                                }
                                }
                            >
                                <i className='logouts-icons bx bx-log-out-circle' style={{ color: `${!sidebarOpen ? 'red' : 'white'}` }}></i>
                                <span className="logouts">Logout</span>

                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <div className="main-con">

                <Navbar open={sidebarOpen} />
                <Box sx={{ maxHeight: '90vh', overflow: 'scroll', overflowX: 'auto' }}>
                    <Suspense fallback={<Loader />}>

                        <ScreensNavigator />
                    </Suspense>

                </Box>


            </div>
        </React.Fragment>
    )
}
