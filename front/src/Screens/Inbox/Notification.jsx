import React from 'react';
import { Typography, Box } from '@mui/material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useTranslation } from 'react-i18next';

const Notification = ({ notification }) => {
  const { t } = useTranslation();

  const inputDateTime = new Date(notification.add_datettime);
  const utcMinus5DateTime = new Date(
    inputDateTime.getTime() - inputDateTime.getTimezoneOffset() * 60000 - 5 * 3600000
  );

  console.log(notification)

  return (
    <div>
      <div className='notification-shadow' style={{ padding: '0' }}>
        <Box sx={{ display: 'flex', p: 2,width:'5%' }}>
           <NotificationsActiveOutlinedIcon sx={{ color: 'var(--primary-color)', fontSize: 30 }} />
        </Box>
          <Box sx={{width:'55%',borderRight: '1px solid #ededed'}}>
            <Typography sx={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }}>
              {notification.noti_title}
            </Typography>
            <Typography sx={{ fontSize: 14, textAlign: 'left' }}>
            {notification.noti_desc}
            </Typography>
          </Box>
          <Box sx={{width:'20%'}}>
            <Typography sx={{ textAlign: 'center', fontSize: 14  }}>
              {notification.name}({notification.role})
            </Typography>
          </Box>

        <Box sx={{width:'10%',textAlign: 'center',}}>
          <Typography
            sx={{ fontSize: 14,  fontWeight: 'bold' }}
          >
            {inputDateTime.toLocaleString().split(',')[0]}
          </Typography>
        </Box>
        <Box sx={{width:'10%',textAlign: 'center',}}>
          <Typography
            sx={{ fontSize: 14, fontWeight: 'bold' }}
          >
            {utcMinus5DateTime.toLocaleString().split(',')[1]}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Notification;
