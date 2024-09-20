import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboard } from '../../Redux/dashboardReducer';

const SimpleBarChart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dashboardData, status, error } = useSelector((state) => state.Dashboard);
  const { user } = useSelector(state => state.Auth);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(fetchDashboard(user.user_id));
  }, [dispatch, user.user_id]);

  useEffect(() => {
    if (dashboardData?.subTaskStatusPercentage) {
      const translatedArray = dashboardData.subTaskStatusPercentage.map(item => ({
        name: t(item.name), 
        SubTareas: item.SubTareas,
        color: item.color   
      }));
      setChartData(translatedArray);
    }
  }, [dashboardData, t]);

  return (
    <div className="box-shadow mt-4 mb-5" style={{ borderRadius: '20px' }}>
      <div
        className='pt-3 px-4 text-white'
        style={{ 
          background: 'linear-gradient(to right, #4C02E0, #8E2DE2)',
          borderRadius: '20px 20px 0 0',
          borderBottom: '4px solid white'
        }}
      >
        <h2>{t('SubTareas')}</h2>
      </div>
      <div
        className='py-4 d-flex justify-content-center'
        style={{ 
          background: 'linear-gradient(to right, #4C02E0, #8E2DE2)',
          borderRadius: '0 0 20px 20px'
        }}
      >
        <BarChart width={800} height={300} data={chartData} className='bg-white py-4'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="SubTareas" barSize={80} fill='#2E7D32'>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="SubTareas" formatter={(value) => `${value}%`} position="top" />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default SimpleBarChart;
