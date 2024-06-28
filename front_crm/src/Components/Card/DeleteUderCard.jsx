import React from 'react'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import Image from '../../assets/images/Rectangle 17.png'

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonIcon from '@mui/icons-material/Person';// import Typography from '@mui/material'
export default function DeleteUserCard({ data }) {

    // console.log(data)
    return (
        <div>
            <Box sx={{ width: '100%', }}>

                <Box sx={{
                    p: 2, borderRadius: 3, width: '25rem', margin: 'auto', display: 'flex', flexDirection: 'column',
                    alignItems: "center"
                }}>
                    <Box sx={{ height: '10rem', position: 'relative' }}>
                        {/* <PushPinIcon sx={{
    position: 'absolute', left: -80, transform: 'rotate(120deg)', color: theme.palette.primary.main, fontSize: 26

  }} /> */}

                        <Avatar
                            alt="Company Logo"
                              src={data.user_pic?data.user_pic:Image}
                            style={{ width: 200, height: 200, objectFit: 'cover',boxShadow: '2px 6px 6px rgba(0, 0, 0, 0.2)' }}
                        />
                    </Box>


                    {/* INFORMATION FORM */}
                    <Box sx={{ marginTop: 6 }}>
                        <Box sx={{ width: '100%' }}>

                            <Typography sx={{ color: 'var(--primary-color)' }} variant='h6' align='center' >
                                {data.name}
                            </Typography>
                            <Typography variant='body2' align='center' sx={{mt:3}}>
                            <PersonIcon color='primary' fontSize='small' />  {data.role}
                            </Typography>


                            <Typography align='center' sx={{ fontSize: 14 }}>
                                <EmailIcon color='primary' fontSize='small' />  {data.email}
                            </Typography>
                            <Typography align='center' sx={{ fontSize: 14 }}>
                            <PhoneIphoneIcon color='primary' fontSize='small' />  {data.phone}
                            </Typography>
                            {/* <Typography align='center' sx={{ fontSize: 14 }}>
                                {data.customer_company_name}
                            </Typography> */}

                        </Box>
                    </Box>

                </Box>
            </Box>
        </div>
    )
}
