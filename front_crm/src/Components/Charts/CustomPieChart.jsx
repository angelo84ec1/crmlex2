import "./style.css";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// console.log(
//   moment(1612390027112).startOf("minute").add(1, "minutes").toISOString()
// );

export default function CustomPieChart() {
  const { t } = useTranslation()
  const { dashboardData } = useSelector(state => state.Dashboard)
  // const COLORS = ["#FFB946", "#2ED47A", "#F7685B", "#50D1AA","#CD500C"];
  const COLORS = ["#D9BB41", "#4A00E0", "#2ED47A", "#8E2DE2","#CD500C"];

// console.log(dashboardData)
  const Bullet = ({ backgroundColor, size }) => {
    return (
      <div
        className="CirecleBullet"
        style={{
          backgroundColor,
          width: size,
          height: size
        }}
      ></div>
    );
  };

  const CustomizedLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="LegendList">
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <div className="BulletLabel">
              <Bullet backgroundColor={entry.payload.fill} size="10px" />
              <div className="BulletLabelText" style={{ fontSize: 16, }}>{entry.value}</div>
            </div>
            {/* <div style={{ marginLeft: "24px", fontSize: 14,color:'white' }}>{entry.payload.value}</div> */}
          </li>
        ))}
      </ul>
    );
  };



 
  const data01 = [
    { name: `${t('pending')}`, value: dashboardData.pending_projects},
    { name: `${t('active')}`, value: dashboardData.active_projects },
    { name: `${t('completed')}`, value: dashboardData.completed_projects },
    { name: `${t('new')}`, value: dashboardData.newProjects},
    { name: `${t('late')}`, value: dashboardData.lateProjects}
  ];


  return (
    // <div style={{ width: "100%", height: 300 }}>
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie

            data={data01}
            dataKey="value"
            cx='50%'
            cy='60%'
            innerRadius={90}
            outerRadius={102}
            label
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            {/* <Label
              content={<CustomLabel labelText="ICPs" value={15} />}
              position="center"
            /> */}
          </Pie>
          <Legend
            verticalAlign="bottom"
            layout="vertical"
            align="center"
            height={36}
            content={<CustomizedLegend />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
