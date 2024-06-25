import React, { useEffect } from "react";
import { GanttOriginal } from "react-gantt-chart";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import './style.css'


const NewGantt = () => {

	const { ganttChart } = useSelector(state => state.Dashboard)
	const [viewMode, setViewMode] = React.useState('Day')
	const { t } = useTranslation()
	const [page, setPage] = React.useState(0)
	const [rows, setRows] = React.useState(ganttChart?.slice(0, 7))
	
	
	const handleChange = (event) => {
		setViewMode(event.target.value);
	};

	const handleNextPageClick = (row) => {
		setPage(page+7)
	}
	const handleBackPageClick = (row) => {
		setPage(page-7)
	}

	useEffect(() => {
		setRows(ganttChart?.slice(page, page+7))
	}, [ganttChart, page])

	const status = [
		{
			backgroundColor: '#D9BB41',
			label: t('pending'),
		},
		{
			backgroundColor: 'var(--primary-color)',
			label: t('active'),
		},
		{
			backgroundColor: '#20BF55',
			label: t('completed'),
		},
		{
			backgroundColor: 'var(--secondary-color)',
			label: t('new'),
		},
		{
			backgroundColor: '#CD500C',
			label: t('late'),
		},

	];

	return (
		<React.Fragment>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around',alignItems:'center' }}>

				{status.map((color) => {
					return <Box key={color.backgroundColor} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

						<Box sx={{ width: '5rem', height: '1rem', backgroundColor: `${color.backgroundColor}`,borderRadius:'3px' }}>
						</Box>
						<Typography>{color.label}</Typography>
					</Box>
				})

				}

				<FormControl sx={{ mt: 2, mb: 2 }}>
					<InputLabel id="demo-simple-select-label">{t('view')} </InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={viewMode}
						size="small"
						sx={{ width: 150 }}
						label="Age"
						onChange={handleChange}
					>
						<MenuItem value={'Day'}>{t('day')}</MenuItem>
						{/* <MenuItem value={'HalfDay'}>Half Day</MenuItem> */}
						<MenuItem value={'Week'}>{t('week')}</MenuItem>
						<MenuItem value={'Month'}>{t('month')}</MenuItem>
					</Select>
				</FormControl>
			</Box>
			{ganttChart.length > 0?
				<GanttOriginal
				tasks={rows}
				viewMode={viewMode}
				columnWidth={100}
				ganttHeight={400}
				/>
				:''
			}

			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
				{<button onClick={handleBackPageClick} disabled={page===0} className={`mx-5 btn ${page===0?"btn-secondary":"btn-primary"}`}>{t('back')}</button>}
				Page {page/7+1}
				{<button onClick={handleNextPageClick} disabled={ganttChart.length < page+7} className={`mx-5 btn ${ganttChart.length < page+7?"btn-secondary":"btn-primary"}`}>{t('next')}</button>}
			</Box>
		</React.Fragment>
	);
};

export default NewGantt;
