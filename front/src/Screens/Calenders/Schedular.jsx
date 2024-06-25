import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css'; // Import your custom CSS styles
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddProjectPop from '../../Components/PopUp/Project/AddProjectPop';

export default function Schedular() {
  const localizer = momentLocalizer(moment)
  const { userSchedule } = useSelector(state => state.Users)
  const { t } = useTranslation()
  const ref = React.useRef(null)

  const handleTask = () => {
    ref.current.click()
  }


  return (
    <div>
      <Button
        onClick={handleTask}
        variant='contained' sx={{ mb: 1 }}>
        {t('add_event')}
      </Button>
      <Calendar
        localizer={localizer}
        events={userSchedule}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <AddProjectPop ref={ref} />
    </div>
  )
}
