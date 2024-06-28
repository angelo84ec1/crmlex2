import React from 'react'
import { useTranslation } from "react-i18next";
import DashboardTask from './DashboardTask'
import { LinearProgress, Typography } from '@mui/material'
import DashboardProjects from './DashboardProjects'
import { useSelector } from 'react-redux'

export default function Dashboard() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = today.getMonth();
  const monthName = monthNames[monthIndex];
  const year = String(today.getFullYear()).slice(-2);
  const currentDate = `${day}-${monthName}-${year}`;
  const { dashboardData, latestProjects } = useSelector(state => state.Dashboard)
  const { user } = useSelector(state => state.Auth)
  const { t } = useTranslation()
  // let avg = (dashboardData.ended_projects + dashboardData.total_tasks) / 2;
  // let avgProjects = Math.ceil(avg);
  // let avgProjects = (dashboardData.ended_projects / dashboardData.total_tasks) * 100
  let avgProjects = (dashboardData.completed_projects / dashboardData.total_projects) * 100
  return (
    <React.Fragment>
      <div style={{}}>
        {/* <div className="cont ">
          <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: 24 }}  >{t('dashboard')}</Typography>
          <div className="dashboard-date" style={{ padding: 5 }}>
         
            <h4 style={{ color: 'black', marginLeft: '1rem', marginTop: '-1rem', fontSize: 16 }}>{currentDate}</h4>

          </div>
        </div> */}
        {/* <!-- ============== --> */}
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-4">
              <div className="box-1 box-shadow mt-2">
                <div className="box1">
                  <h4>{t('total_project')}</h4>
                  <span>{dashboardData.total_projects}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box-1 box-shadow  mt-2">
                <div className="box1 ">
                  <h4>{t('total_task')}</h4>
                  <span>{dashboardData.total_tasks}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4" style={{display:`${user.role==="Administrador"?"block":"none"}`}}>
              <div className="box-1 box-shadow mt-2">
                <div className="box1">
                  <h4>{t('total_user')}</h4>
                  <span>{dashboardData.total_users}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- ============= --> */}
          {/* <!-- <div className="container-fluid"> --> */}
          <div className="row">
            <div className="col-lg-7 col-md-12 col-sm-12 ">
              <div className="taskchat ">
                <div className="tassk">
                  <div className="task-chart-txt ps-2 pe-2">
                    <span className="task-text ps-3"><b>{dashboardData.completed_projects}</b> {t('task_completed_out_of')}<b> {dashboardData.total_projects}</b></span>
                    {/* <div className="selecters">
                      <span className="select">Show:</span>
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>One</option>
                        <option value="1">ALL</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div> */}
                  </div>
                </div>
                <div className="progress-date ps-4 pe-4">
                  <div className="progressbar mt-2">
                    {/* <div className="progress">
                      <div className="progress-bar bg-success" role="progressbar" aria-label="Warning example"
                        style={{ width: "75%", ariaValueNow: "40", ariaValueMin: "80", ariaValueMax: "100" }}>
                          
                        </div>
                    </div> */}
                    <LinearProgress value={avgProjects} variant="determinate" color="success" sx={{ height: 10, borderRadius: 20 }} />
                  </div>
                  <div className="date-sec mt-3">
                    {/* <h3>23 DEC , Sunday</h3> */}
                    <h3>{currentDate}</h3>
                  </div>
                </div>
                {/* <div className="week-table mt-4">
                  <table className="table table-borderless text-center table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">{t('mon')}</th>
                        <th scope="col">{t('tues')}</th>
                        <th scope="col">{t('wed')}</th>
                        <th scope="col">{t('thur')}</th>
                        <th scope="col">{t('fri')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>24</td>
                        <td>26</td>
                        <td>14</td>
                        <td>34</td>
                        <td>41</td>
                      </tr>

                    </tbody>
                  </table>
                </div> */}
                <hr />
                {/* <!-- ===============Task========== --> */}
                <div style={{ overflow: 'scroll', overflowX: 'hidden',height:"17rem" }}>

                  {
                    latestProjects.map((item) => {
                      return <DashboardTask project={item} />
                    })
                  }
                  <Typography variant='body2' align='center' sx={{mt:'8rem',display:`${!latestProjects.length<1&&'none'}`}}>
                    {t('empty')}
                  </Typography>
                </div>


                {/* <!-- =================readmore-sec========= --> */}
                <div className="readmore-sec mt-1">

                  {/* <h3 data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false"
                    aria-controls="collapseExample">
                    Read more
                  </h3> */}

                  {/* <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                      {
                        latestProjects.slice(2).map((item) => {
                          return <DashboardTask project={item} />
                        })

                      }
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <!-- =================readmore-end========= --> */}

            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">



              {/* DASHBOARD PROJECTS */}
              <DashboardProjects />


              {/* <!-- =======todo-list========== --> */}
              {/* <TodoList /> */}
              {/* <!-- =======todo-list-end========== --> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
