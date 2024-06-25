import React from 'react'
import {  useSelector } from "react-redux";
export default function GanttChartTimeline() {
  const {user}=useSelector(state=>state.Auth)
  return (
    <div>
       <div style={{height:'70vh'}}>
       <iframe src={`https://angeloluna.thewebconcept.com/gantchart/index.php?user_id=${user.user_id}`} width="100%" height="500"></iframe>
            </div>
    </div>
  )
}
