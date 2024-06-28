import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div style={{width:"100%",height:'90vh',display:"flex",alignItems:'center',justifyContent:'center'}}>
      <CircularProgress/>
    </div>
  )
}
