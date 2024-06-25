import React from 'react'
import CustomPieChart from '../../Components/Charts/CustomPieChart'
import { useTranslation } from 'react-i18next'

export default function DashboardProjects() {
    const {t}=useTranslation()
    return (
        <React.Fragment>
            <div className="taskchat2">
                <div className="porject-chart-txt">
                    <span>{t('projects')}</span>
             
                </div>
                <CustomPieChart/>
         
            </div>
        </React.Fragment>
    )
}
