import React from 'react'
import PaginationTable from '../../Components/Table/PaginationTable'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
export default function Users() {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      {/* <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 24 }}  >{t('users')}</Typography> */}
<Box sx={{p:2,backgroundColor:'white',m:2,borderRadius:5}} >


      <PaginationTable />
</Box>
    </React.Fragment>
  )
}

