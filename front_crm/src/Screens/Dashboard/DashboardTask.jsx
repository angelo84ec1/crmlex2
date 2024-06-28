import React from 'react'
import Img from '../../assets/images/Rectangle 17.png'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

export default function DashboardTask({ project }) {
    // console.log(project)
    const { t } = useTranslation()
    return (
        <React.Fragment>
            <div className="reminder-sec mt-3 ms-4 me-4 ps-4 pe-4">
                <div className="user-img mt-4">
                    <div className="user-image">
                        <span><img src={project.user_pic?project.user_pic:Img} style={{width:'2rem',height:"2rem",objectFit:'cover'}} alt="" />
                            {project.name}
                        </span>
                    </div>
                    {/*<Box sx={{*/}
                    {/*    p: 1,*/}
                    {/*    width:'7rem',*/}
                    {/*    mt:2,*/}
                    {/*    textAlign:"center",*/}
                    {/*    color: 'white',*/}
                    {/*    borderRadius: 2,*/}
                    {/*    backgroundColor: project.project_status === 'completed' ? '#20BF55' :*/}
                    {/*        project.project_status === 'pending' ? '#D9BB41' : '#D9BB41'*/}
                    {/*}}>*/}
                    {/*    {t(project.project_status)}*/}
                    {/*</Box>*/}
                    <Box sx={{
                        p: 1, minWidth:'7rem', mt:2,textAlign:"center",color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',
                        backgroundColor: project.project_status === 'completed' ? '#20BF55' :
                            project.project_status === 'new' ? '#8E2DE2' :
                                project.project_status === 'late' ? '#CD500C' :
                                    project.project_status === 'pending' ? '#D9BB41' : '#4A00E0'
                    }}>
                        {t(project.project_status)}

                    </Box>
                </div>
                <div className=" pt-2">
                    <div className="task-reminder">
                        <h4>{project.project_name}</h4>
                        {/* <h4>{t('task')}{project.id}</h4> */}
                        {/* <h5>Reminder</h5> */}
                    </div>
                    <div className="reminder-date ">
                        <p>{t('start_date')}: <span>{project.project_startdate}</span></p>
                    </div>
                    <div className="reminder-date ">
                        <p>{t('due_date')}: <span>{project.project_enddate}</span></p>
                    </div>
                    <div className="reminder-date ">
                        <p>{t('discription')}: <span className='spanText'>

                            {project.project_description}
                        </span>
                        </p>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}
