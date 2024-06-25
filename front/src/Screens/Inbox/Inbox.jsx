import React from 'react'
import { Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Notification from './Notification'
import { useSelector } from 'react-redux'

export default function Inbox() {
  const { t } = useTranslation()
  const { notifications } = useSelector(state => state.Dashboard)
  return (
    <React.Fragment>
       {/*<Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 24 }}  >{t('inbox')}</Typography>*/}
      <Paper elevation={0} sx={{m:2,p:1,borderRadius:5}}>

        <div style={{ width: '100%', justifyContent: 'center'}}>

          <div style={{ backgroundColor: 'var(--backgourd-color)', }}>
            {notifications.length<1?

            <Typography align='center'>{t('empty')}</Typography>
              : notifications.map((notification) => {
                return <Notification notification={notification} />
              })
            }

          </div>
        </div>
      </Paper>
    </React.Fragment>
  )
}
