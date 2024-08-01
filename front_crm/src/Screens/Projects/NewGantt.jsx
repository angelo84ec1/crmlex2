import React, { useEffect } from "react";
import { GanttOriginal } from "react-gantt-chart";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import './style.css';

const NewGantt = () => {

	const { ganttChart } = useSelector(state => state.Dashboard);
	const parentTasks = ganttChart.filter(task => task.project_type === 'task');
	const [viewMode, setViewMode] = React.useState('Day');
	const { t } = useTranslation();
	const [page, setPage] = React.useState(0);
	const [rows, setRows] = React.useState(ganttChart?.slice(0, 7));
	const [expandedTasks, setExpandedTasks] = React.useState({});

	const handleChange = (event) => {
		setViewMode(event.target.value);
	};

	const handleNextPageClick = () => {
		setPage(page + 7);
	};

	const handleBackPageClick = () => {
		setPage(page - 7);
	};

	const handleArrowClick = (selectedTask) => {
        setExpandedTasks(prev => ({
            ...prev,
            [selectedTask.id]: !prev[selectedTask.id]
        }));
    };

    useEffect(() => {
        const parentTasks = ganttChart.filter(task => task.project_type === 'task');
        const paginatedTasks = parentTasks.slice(page, page + 7);
    
        const updatedRows = paginatedTasks.reduce((acc, task) => {
            const isExpanded = expandedTasks[task.id] || false;
            const div = document.querySelector('div[style*="color: rgb(86, 86, 86);"][style*="font-size: 0.6rem;"][style*="padding: 0.15rem 0.2rem 0rem;"][style*="user-select: none;"][style*="cursor: pointer;"]');
            if (div) {
                const newDiv = document.createElement('div');
                newDiv.style.color = 'rgb(86, 86, 86)';
                newDiv.style.fontSize = '0.7rem';
                newDiv.style.padding = '0.15rem 0.2rem 0rem';
                newDiv.style.userSelect = 'none';
                newDiv.style.cursor = 'pointer';
                newDiv.innerHTML = isExpanded ? '▼' : '▶'; 
                newDiv.onclick = () => handleArrowClick(task);
                div.parentNode.replaceChild(newDiv, div);
                div.onclick = () => handleArrowClick(task);
            } 
            acc.push({
                ...task
            });
    
            if (isExpanded) {
                const childTasks = ganttChart.filter(child => child.parent_id === task.id && child.project_type === 'sub_task');
                acc.push(...childTasks.map(childTask => {
                    const isChildExpanded = expandedTasks[childTask.id] || false;
    
                    return {
                        ...childTask
                    };
                }));
    
                const subTasks = childTasks.reduce((subAcc, subTask) => {
                    const subSubTasks = ganttChart.filter(subSub => subSub.parent_id === subTask.id && subSub.project_type === 'sub_sub_task');
                    subAcc.push(...subSubTasks.map(subSubTask => ({
                        ...subSubTask,
                        name: '\u00A0\u00A0\u00A0\u00A0' + subSubTask.name
                    })));
                    return subAcc;
                }, []);
                
    
                acc.push(...subTasks);
            }
    
            return acc;
        }, []);
        setRows(updatedRows);
    }, [page, expandedTasks, ganttChart, parentTasks]);
    

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
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

				{status.map((color) => (
					<Box key={color.backgroundColor} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
						<Box sx={{ width: '5rem', height: '1rem', backgroundColor: `${color.backgroundColor}`, borderRadius: '3px', marginRight: '10px' }}></Box>
						<Typography>{color.label}</Typography>
					</Box>
				))}

				<FormControl sx={{ mt: 2, mb: 2 }}>
					<InputLabel id="demo-simple-select-label">{t('view')} </InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={viewMode}
						size="small"
						sx={{ width: 150 }}
						label="View"
						onChange={handleChange}
					>
						<MenuItem value={'Day'}>{t('day')}</MenuItem>
						<MenuItem value={'Week'}>{t('week')}</MenuItem>
						<MenuItem value={'Month'}>{t('month')}</MenuItem>
					</Select>
				</FormControl>
			</Box>
			{ganttChart.length > 0 &&
				<GanttOriginal
					tasks={rows}
					viewMode={viewMode}
					columnWidth={100}
					ganttHeight={400}
				/>
			}

			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
				<button onClick={handleBackPageClick} disabled={page === 0} className={`mx-5 btn ${page === 0 ? "btn-secondary" : "btn-primary"}`}>{t('back')}</button>
				Page {page / 7 + 1}
				<button onClick={handleNextPageClick} disabled={ganttChart.length <= page + 7} className={`mx-5 btn ${ganttChart.length <= page + 7 ? "btn-secondary" : "btn-primary"}`}>{t('next')}</button>
			</Box>
		</React.Fragment>
	);
};

export default NewGantt;
