import React from 'react'
// import PlusIcon from '../../assets/images/plus-icon.svg'
import Img1 from '../../assets/images/Rectangle 17.png'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom';
export default function Navbar({ open }) {
    const { user } = useSelector(state => state.Auth)
    const location = useLocation()
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = today.getMonth();
    const monthName = monthNames[monthIndex];
    const year = String(today.getFullYear()).slice(-2);
    const currentDate = `${day}-${monthName}-${year}`;
    const { t } = useTranslation()
    return (
        <React.Fragment>
            <Box sx={{
                borderRadius: 5, p: 1, background: `${!open ? 'linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)' : 'white'}`,
                boxShadow: open ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'
            }} className="navbar nav navbar-expand-lg  ">
                <div className="container-fluid">
                    {/* <a className=" ms-4 nav-heading navbar-brand" href="">Dashboard</a> */}
                    <div>

                        <Typography variant='h5' sx={{ fontWeight: 'bold', color: `${!open && 'white'}` }}>{location.pathname === '/' ? t('dashboard') : t(location.pathname.slice(1))}</Typography>
                        <Typography style={{ color: `${!open ? 'white':'black'}`, fontSize: 14 }}>{currentDate}</Typography>
                    </div>
                    {/* <h4 style={{ display: `${!open ? 'block' : 'none'}`, color: `${open && 'white'}` }}>CRM</h4> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>

                        <div className="dropdown dropstart float-end mt-2">

                            <ul className="dropdown-menu others-dropdown">
                                <li>
                                    <a className="dropdown-item" href=""><i className='bx bx-task'></i> Tasks</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href=""><i className='bx bx-checkbox'></i> Projects</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href=""><i className='bx bx-network-chart'></i> Workflows</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href=""><i className='bx bx-folder'></i> Folder</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href=""><i className='bx bxs-user-plus'></i> Invite</a>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex admin-name mt-2">
                            <div >
                                <p className="me-2 " style={{ color: `${!open ? 'white' : 'black'}` }} >{user.name} <br /><span>{user.user_role}</span></p>
                            </div>
                            <img style={{ height: '2rem', width: '2rem',borderRadius:50,objectFit:'cover' }} className="me-2 nav-img" src={user.user_pic?user.user_pic:Img1} alt="Crm" />
                        </div>
                    </div>
                </div>
            </Box>
        </React.Fragment>
    )
}
