import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ResumenTable from '../../Components/Table/ResumenTable'
export default function Tasks() {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <Paper elevation={0} sx={{ p: 2, m: 2, borderRadius: 5 }}>
        <ResumenTable />
      </Paper>
    </React.Fragment>
  )
}
