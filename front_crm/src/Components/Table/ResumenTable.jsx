import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { Box, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AddTaskPop from '../PopUp/Tasks/AddTaskPop';

import html2pdf from 'html2pdf.js';
import DownloadIcon from '@mui/icons-material/Download';

import { useTranslation } from 'react-i18next';
import TaskMultiSelect from "../UseAble/TaskMultiSelect.jsx";
import ModeEditIcon from "@mui/icons-material/ModeEdit.js";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline.js";
import TablePagination from "@mui/material/TablePagination";
import {setCurrentProject, setCurrentTask} from "../../Redux/taskReducer.js";
import EditTask from "../PopUp/Tasks/EditTask.jsx";
import DeleteTask from "../PopUp/Tasks/DeleteTask.jsx";
import AddSubTaskPop from "../PopUp/SubTasks/AddSubTaskPop.jsx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown.js";
import Collapse from "@mui/material/Collapse";
import EditSubTaskPop from "../PopUp/SubTasks/EditSubTaskPop.jsx";
import DeleteSubTaskPop from "../PopUp/SubTasks/DeleteSubTaskPop.jsx";
import TaskStatus from "../PopUp/Tasks/TaskStatus.jsx";
import SubTaskStatus from "../PopUp/SubTasks/SubTaskStatus.jsx";
import SubTaskMultiSelect from "../UseAble/SubTaskMultiSelect.jsx";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined.js";
import AddTaskEmailPopUp from "../PopUp/Tasks/Task Email/AddTaskEmailPopUp.jsx";


function Row(props){
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.Auth)
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    ({row.id})
                </TableCell>

                <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }} align="left">
                    {row.project_name}
                </TableCell>

                <TableCell align='left'>
                    {row?.assign_user.map(function(item, i){
                        return <p className={'mb-0'}>{item?.assin_by?.name}</p>
                    })}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'normal', fontSize: 14 }}>{row.project_startdate}</TableCell>
                <TableCell sx={{ fontWeight: 'normal', fontSize: 14 }} align="center">{row.project_enddate}</TableCell>
                <TableCell sx={{ fontWeight: 'normal', fontSize: 14 }} align="center">{row.progress}%</TableCell>
                <TableCell align="center">
                    <Box sx={{
                        p: 1, color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',
                        backgroundColor: row.project_status === 'completed' ? '#20BF55' :
                            row.project_status === 'new' ? 'var(--secondary-color)' :
                                row.project_status === 'late' ? '#CD500C' :
                                    row.project_status === 'pending' ? '#D9BB41' : 'var(--primary-color)'
                    }}>
                        {t(row.project_status)}
                    </Box>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={'100%'}>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TableHead >
                                <TableRow>
                                    <TableCell  align="left">#</TableCell>
                                    <TableCell  align="left">{t('task')}</TableCell>
                                    <TableCell  align="left">{t('assignee')}</TableCell>
                                    <TableCell  align="left">{t('start_date')}</TableCell>
                                    <TableCell  align="left">{t('due_date')}</TableCell>
                                    <TableCell  align="center">{t('progress')}</TableCell>
                                    <TableCell  align="left">{t('status')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row?.tasks?.map((task, taskIndex) => {
                                    return (
                                        <React.Fragment>
                                            <TableRow key={`${task.title}-${taskIndex}`}>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">
                                                <div className={'round-circle'}></div>
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row"> {task?.task_name?.title}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">
                                                {task.task_name?.assign_user?.map(function(item, i){
                                                    return <p className={'mb-0'}>{item?.assin_by?.name}</p>
                                                })}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{task?.task_name?.start_date}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{task?.task_name?.end_date}
                                            </TableCell>
                                            <TableCell align="center"
                                                       component="th"
                                                       scope="row">{task?.task_name?.progress}%
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{
                                                    p: 1, color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',
                                                    backgroundColor: task?.task_name?.status === 'completed' ? '#20BF55' :
                                                        task?.task_name?.status === 'new' ? 'var(--secondary-color)' :
                                                            task?.task_name?.status === 'late' ? '#CD500C' :
                                                                task?.task_name?.status === 'pending' ? '#D9BB41' : 'var(--primary-color)'
                                                }}>
                                                    {t(task?.task_name?.status)}
                                                </Box>
                                            </TableCell>

                                        </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={'100%'}>
                                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Table size="small" aria-label="purchases" width={'100%'}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell  align="left">#</TableCell>
                                                                        <TableCell  align="left">{t('subtask')}</TableCell>
                                                                        <TableCell  align="left" > {t('assignee')}</TableCell>
                                                                        <TableCell  align="left">{t('start_date')}</TableCell>
                                                                        <TableCell  align="left">{t('due_date')}</TableCell>
                                                                        <TableCell  align="center">{t('progress')}</TableCell>
                                                                        <TableCell  align="left">{t('status')}</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {task?.sub_tasks && task?.sub_tasks.map((tasksRow, i) => (
                                                                        <TableRow key={tasksRow.id}>
                                                                            <TableCell component="th" scope="row">
                                                                                <div className={'round-ractangle'}></div>
                                                                            </TableCell>
                                                                            <TableCell component="th" scope="row">
                                                                                {tasksRow.sub_task_name?.title}
                                                                            </TableCell>
                                                                            <TableCell align='center'>
                                                                                {tasksRow?.sub_task_name?.assign_user?.map(function(item, i){
                                                                                    return <p className={'mb-0'}>{item?.assin_by?.name}</p>
                                                                                })}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {tasksRow.sub_task_name?.start_date}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {tasksRow.sub_task_name?.end_date}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                {tasksRow.sub_task_name?.progress}%
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <Box sx={{
                                                                                    p: 1, color: 'white', borderRadius: 2,
                                                                                    backgroundColor: tasksRow?.sub_task_name?.status === 'completed' ? '#20BF55' :
                                                                                        tasksRow?.sub_task_name?.status === 'new' ? 'var(--secondary-color)' :
                                                                                            tasksRow?.sub_task_name?.status === 'late' ? '#CD500C' :
                                                                                                tasksRow?.sub_task_name?.status === 'pending' ? '#D9BB41' : 'var(--primary-color)'
                                                                                }}>
                                                                                    {t(tasksRow?.sub_task_name?.status)}
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                    </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    )
}

export default function TaskTable() {
    const [page, setPage] = React.useState(0);
    const { projectTasks } = useSelector(state => state.TaskReducer)
    const { tasks } = useSelector(state => state.TaskReducer)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search,] = React.useState(projectTasks)
    const { t } = useTranslation()
    const contentRef = React.useRef('')
    const ref = React.useRef(null)

    const { user } = useSelector(state => state.Auth)

    function createData(project_name, assign_user, project_status, project_startdate, project_enddate, tasks, id, project_description, progress) {
        return { project_name, assign_user, project_status, project_startdate, project_enddate, tasks, id, project_description, progress };
    }

    const rows = tasks.map((item) => {
        return createData(item.project_name, item.assign_user, item.project_status, item.project_startdate, item.project_enddate, item.tasks, item.id, item.project_description, item.progress, item.tasks)
    })

    const handleDownloadPDF = () => {
        const element = contentRef.current;
        const options = {
            margin: [0, 0.5, 0, 0.5], // top, right, bottom, left margins in inches
            filename: 'crm.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape', compressPDF: true },
            width: 842, // swapping width and height for landscape orientation
            height: 595
        };
        html2pdf().set(options).from(element).save();
    };

    const addTask = () => {
        ref.current.click()
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <React.Fragment>

            <Box id='scroll' sx={{ width: '100%', p: 3 }}>
                <Button variant='contained'
                    sx={{ display: `${projectTasks.length < 1 && 'none'}` }}
                    endIcon={<DownloadIcon />}
                    onClick={handleDownloadPDF}> PDF</Button>
                <TableContainer >

                  <div ref={contentRef}>
                      <Table aria-label="collapsible table" sx={{ maxHeight: '77vh' }}>
                        <TableHead >
                            <TableRow >
                                <TableCell>#</TableCell>
                                <TableCell style={style.tableHeading} >{t('Projects')}</TableCell>
                                <TableCell style={style.tableHeading} align="left">{t('assignee')}</TableCell>
                                <TableCell style={style.tableHeading} align="center" sx={{ width: '10rem' }}>{t('start_date')}</TableCell>
                                <TableCell style={style.tableHeading} align="center" sx={{ width: '12rem' }}>{t('due_date')}</TableCell>
                                <TableCell style={style.tableHeading} align="center" sx={{ width: '3rem' }}>{t('progress')}</TableCell>
                                <TableCell style={style.tableHeading} align="center" sx={{ width: '3rem' }}>{t('status')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <Row key={row.id} row={row} />
                                    );
                                })}
                        </TableBody>
                    </Table>
                  </div>
                    <Box sx={{ display: `${!search.length < 1 ? 'none' : "flex"}`, flexDirection: 'column', mt: 20, justifyContent: 'center', alignItems: 'center' }}>

                        <Typography align='center'>
                            {t('no_item_found')}
                        </Typography>

                    </Box>

                    <AddTaskPop ref={ref} />

                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    sx={{ display: `${search.length < 1 ? 'none' : "block"}` }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </React.Fragment>
    );
}

const style = {
    tableHeading: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subTableHeading: {
        // fontWeight: 'bold',
        fontSize: 14,
        color: 'var(--primary-color)'
    }, iconButton: {
        backgroundColor: 'var(--primary-color)', color: 'white',
        m: '1px',
        '&:hover': {
            backgroundColor: 'var(--secondary-color)',
            color: 'black',
        },
    }
}
