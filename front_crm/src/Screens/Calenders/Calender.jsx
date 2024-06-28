import { Paper, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Scheduler } from "@aldabil/react-scheduler";
import './style.css'
import { useSelector } from 'react-redux';
import Schedular from './Schedular';
export default function Calender() {
    const { t } = useTranslation()
    const { userSchedule } = useSelector(state => state.Users)

    // const [event, setEvent] = React.useState(userSchedule)
    return (
        <React.Fragment>
            {/* <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 24 }}  >{t('calender')}</Typography> */}
<Paper elevation={0} sx={{m:2,p:1,borderRadius:5}}>

            <div style={{ overflow: 'auto', padding: '1rem' }}>
                {/* <Scheduler
                    className='scheduler'
                    view="month"
                    events={userSchedule}
                    height={400}
                    editable={false}
                    deletable={false}
                    draggable={false}
                    onEventClick={()=>console.log('helo')}
                    // selectable={false}
                 

                /> */}
                <Schedular/>

            </div>
</Paper>
            {/* <div style={{height:'70vh'}}>
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=UTC&src=ZW4ucGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230B8043" width="100%" height="600" frameBorder="0" scrolling="no"></iframe>
            </div> */}
        </React.Fragment>
    )
}
