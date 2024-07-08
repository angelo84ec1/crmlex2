import React,{lazy} from 'react'
// import ProjectTable from './ProjectTable'
// import PaginationTable from '../../Components/Table/PaginationTable'
import CollapsibleTable from '../../Components/Table/CollapsibleTable'
import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
// import NewGantt from './NewGantt'
const NewGantt =lazy(()=>import('./NewGantt'))
export default function Projects() {

  const [screen, setScreen] = React.useState(false)
  const { projectTasks } = useSelector(state => state.TaskReducer)

  const { t } = useTranslation()
  const tableScreen = () => {
    setScreen(false)
  }
  const chartScreen = () => {
    setScreen(true)
  }
  return (
    <React.Fragment>
      {/* <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 24 }}  >{t('projects')}</Typography> */}
      <Box sx={{ p: 2, backgroundColor: 'white', m: 2, borderRadius: 5,minHeight:'75vh' }}>

        <div className="container-fluid" >

          <div className="project-main" >
            <div className="project-list">
              <ul>
                {/* <a href="" className="active">
                  <li><i className='bx bx-table pe-1'></i>Table</li>
                </a> */}
                <Button variant={!screen ? 'contained' : 'outlined'} style={{marginRight: 10}} onClick={tableScreen}>
                  {t('table')}
                </Button>

                <Button onClick={chartScreen} 
                disabled={projectTasks.length<1}
                variant={screen ? 'contained' : 'outlined'}>
                  {t('gantt_chart')}
                </Button>
                {/* <a href="./Gantt_chart.html">
                  <li><i className='bx bxs-bar-chart-alt-2 pe-1'></i>Gantt Chart</li>
                </a> */}
                {/* <li>|</li>
                <a href="">
                  <li><i className='bx bx-table pe-1'></i>Fields</li>
                </a>
                <a href="">
                  <li><i className='bx bx-table pe-1'></i>Expand</li>
                </a> */}
              </ul>
            </div>
          </div>
        </div>
        {!screen ?
          <CollapsibleTable />

          : <NewGantt />

        }
      </Box>

    </React.Fragment>
  )
}
