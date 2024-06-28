import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import TaskTable from '../../Components/Table/TaskTable'
export default function Tasks() {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Paper elevation={0} sx={{ p: 2, m: 2, borderRadius: 5 }}>
        {/* <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 24 }}  >{t('tasks')}</Typography> */}
        {/* <Box sx={{ p: 1 }} className='container-fluid'> */}
        <TaskTable />
        {/* </Box> */}
      </Paper>
    </React.Fragment>
  )
}
