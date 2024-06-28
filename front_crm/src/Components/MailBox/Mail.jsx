import React from 'react'
import { Box, Tooltip, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useTranslation } from 'react-i18next';
export default function Mail({ mail }) {
    const { t } = useTranslation()
    function stringAvatar(name) {
        const initials = name.split(' ').map(word => word[0]).join('');

        return {
            sx: {
                bgcolor: 'var(--secondary-color)',
                width: 34,
                height: 34
            },
            children: initials,
        };
    }
    const inputDateTime = new Date(mail.add_datetime);
    const utcMinus5DateTime = new Date(
        inputDateTime.getTime() - inputDateTime.getTimezoneOffset() * 60000 - 5 * 3600000
    );
    const status = mail.subtask_status?mail.subtask_status:mail.status;

  console.log(mail,'mailmailmailmail');
    return (
        <React.Fragment>
            {/*<Typography align="right" sx={{ fontSize: 12, fontWeight: 'bold', mt: 2 }}>{inputDateTime.toLocaleString()}</Typography>*/}
            <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
                <AvatarGroup total={mail.user_list.length}>
                    {
                        mail.user_list.map((item) => (
                            <Tooltip key={item.name} title={item.name}>
                                <Avatar  {...stringAvatar(item.name)} />
                            </Tooltip>
                        ))
                    }
                </AvatarGroup>

                {/* <Typography color={'secondary'} align="center" sx={{ fontSize: 12, fontWeight: 'bold', p: 1 }}>Today</Typography> */}
                <Typography sx={{ fontSize: 14, p: 1,width: '40%',overflow:'hidden' }}>{mail.description}</Typography>
                <Typography sx={{
                    fontSize: 12, p: 1, borderRadius: 2,
                    color: 'white',
                    backgroundColor: status === 'completed' ? '#20BF55' :
                        status === 'new' ? 'var(--secondary-color)' :
                            status === 'late' ? '#CD500C' :
                                status === 'pending' ? '#D9BB41' : 'var(--primary-color)',

                }}> {t(status)}</Typography>

                <Typography align="right" sx={{
                    fontSize: 12, p: 1, borderRadius: 2,
                }}> {inputDateTime.toLocaleString()}</Typography>
            </Box>
        </React.Fragment>
    )
}
