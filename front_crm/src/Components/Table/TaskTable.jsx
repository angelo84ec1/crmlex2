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
    const editref = React.useRef(null)
    const editstatusref = React.useRef(null)
    const deleteref = React.useRef(null)
    const subTaskref = React.useRef(null)
    const editSubTaskref = React.useRef(null)
    const editSubTaskStatusref = React.useRef(null)
    const deleteSubTaskref = React.useRef(null)

    const editTask = () => {
        editref.current.click()
    }
    const editTaskStatus = () => {
        editstatusref.current.click()
    }

    const deleteTask = () => {
        deleteref.current.click()
    }
    const addSubTask = () => {
        subTaskref.current.click()
    }
    const editSubTask = () => {
        editSubTaskref.current.click()
    }
    const editSubTaskStatus = () => {
        editSubTaskStatusref.current.click()
    }
    const deleteSubTask = () => {
        deleteSubTaskref.current.click()
    }

    // EMAIL POPUP REF
    const taskemailPopUp = React.useRef(null)
    const TaskEmailPopUp = () => {
        taskemailPopUp.current.click()
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            dispatch(setCurrentProject(row))
                            setOpen(!open)
                        }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell sx={{ fontWeight: 'bold', fontSize: 14 }} align="left">
                    {row.title}
                </TableCell>


                <TableCell align='center'>
                    <TaskMultiSelect options={
                        row.assign_user.map(item => ({ name: item?.assin_by?.name, id: item.assign_user_id }))
                    } currentTask={row} />
                </TableCell>
                <TableCell sx={{ fontSize: 14 }} align="center">{row.description }</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'normal', fontSize: 14 }}>{row.start_date}</TableCell>
                <TableCell sx={{ fontWeight: 'normal', fontSize: 14 }} align="center">{row.end_date}</TableCell>
                <TableCell align="center"
                           onClick={() => {
                               if (user.role === 'Administrador') {
                                   dispatch(setCurrentTask(row));
                                   editTaskStatus();
                               }
                           }}>
                    <Box sx={{
                        p: 1, color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',
                        backgroundColor: row.status === 'completed' ? '#20BF55' :
                            row.status === 'new' ? 'var(--secondary-color)' :
                                row.status === 'late' ? '#CD500C' :
                                    row.status === 'pending' ? '#D9BB41' : 'var(--primary-color)'
                    }}>
                        {t(row.status)}
                    </Box>
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        sx={{ ...style.iconButton, display: user.role === "Administrador"||user.role === 'Supervisor'? '':'none' }}
                        onClick={() => {
                            dispatch(setCurrentTask(row))
                            editTask()
                        }}
                    >
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton
                        sx={{ ...style.iconButton, display: user.role !== 'Administrador' && 'none' }}
                        onClick={() => {
                            dispatch(setCurrentTask(row))
                            deleteTask()
                        }}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                    {/*<IconButton*/}
                    {/*    sx={{ ...style.iconButton }}*/}
                    {/*    // sx={{ ...style.iconButton, display: user.role === 'Assistant' && 'none' || user.role === 'Cliente' && 'none' }}*/}
                    {/*    onClick={() => {*/}
                    {/*        dispatch(setCurrentTask(row))*/}
                    {/*        TaskEmailPopUp()*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <MailOutlinedIcon />*/}
                    {/*</IconButton>*/}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <TableHead >
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'left' }} >
                                        {t('subtask')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'center' }} >
                                        {t('assignee')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('description')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('dueDate')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('startDate')}</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center">{t('status')}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            sx={{
                                                ...style.iconButton,
                                                display: user.role === "Administrador"||user.role === 'Supervisor'? '':'none' }}
                                            onClick={() => {
                                                dispatch(setCurrentTask(row))
                                                addSubTask()
                                            }}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row?.sub_task?.map((stask, taskIndex) => {
                                    return (
                                        <TableRow key={`${stask.title}-${taskIndex}`}>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{taskIndex+1}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{stask.title}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">
                                                <SubTaskMultiSelect options={
                                                    stask.assign_user.map(item => ({ name: item?.assin_by?.name, id: item.assign_user_id }))
                                                } currentTask={stask} />
                                            </TableCell>

                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{stask.description}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{stask.start_date}
                                            </TableCell>
                                            <TableCell sx={{textAlign: 'left'}}
                                                       component="th"
                                                       scope="row">{stask.end_date}
                                            </TableCell>
                                            <TableCell align="center"
                                                       onClick={() => {
                                                           if (user.role === "Administrador") {
                                                               dispatch(setCurrentTask(stask));
                                                               editSubTaskStatus();
                                                           }
                                                       }}>
                                                <Box sx={{
                                                    p: 1, color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',
                                                    backgroundColor: stask.status === 'completed' ? '#20BF55' :
                                                        stask.status === 'new' ? 'var(--secondary-color)' :
                                                            stask.status === 'late' ? '#CD500C' :
                                                                stask.status === 'pending' ? '#D9BB41' : 'var(--primary-color)'
                                                }}>
                                                    {t(stask.status)}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    sx={{ ...style.iconButton, display: user.role === "Administrador"||user.role === 'Supervisor'? '':'none' }}
                                                    onClick={() => {
                                                        dispatch(setCurrentTask(stask))
                                                        editSubTask()
                                                    }}
                                                >
                                                    <ModeEditIcon />
                                                </IconButton>
                                                <IconButton
                                                    sx={{ ...style.iconButton, display: user.role !== 'Administrador' && 'none' }}
                                                    onClick={() => {
                                                        dispatch(setCurrentTask(stask))
                                                        deleteSubTask()
                                                    }}
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Box>
                    </Collapse>
                </TableCell>
                <EditTask ref={editref}/>
                <TaskStatus ref={editstatusref}/>
                <DeleteTask ref={deleteref} />
                <AddSubTaskPop ref={subTaskref} />
                <EditSubTaskPop ref={editSubTaskref} />
                <SubTaskStatus ref={editSubTaskStatusref} />
                <DeleteSubTaskPop ref={deleteSubTaskref} />
                <AddTaskEmailPopUp ref={taskemailPopUp} />
            </TableRow>

        </React.Fragment>
    )
}

export default function TaskTable() {
    const [page, setPage] = React.useState(0);
    const { projectTasks } = useSelector(state => state.TaskReducer)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search,] = React.useState(projectTasks)
    const { t } = useTranslation()
    const contentRef = React.useRef('')
    const ref = React.useRef(null)

    const { user } = useSelector(state => state.Auth)

    function createData(id,title,assign_user,start_date,end_date,description,status,extend_days,sub_task,progress){
        return { id,title,assign_user,start_date,end_date,description,status,extend_days,sub_task,progress}
    }

    // filter out those whose description doesnot contain "Adding Task in client"
    const rows = projectTasks.map((task, index) => {
        return createData(task.id,task.title,task.assign_user,task.start_date,task.end_date,task.description,task.status,task.extend_days,task.sub_task,task.progress)
    }).filter((row) => {
        return row.description.toLowerCase() !== 'adding task in client'
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
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'left' }} >
                                    {t('tasks')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'center' }} >
                                    {t('assignee')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('description')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('dueDate')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('startDate')}</TableCell>

                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center">{t('status')}</TableCell>


                                <TableCell style={style.tableHeading} sx={{ width: '8rem'}} align="center">

                                    <IconButton
                                    sx={{
                                        ...style.iconButton,
                                        display: user.role === 'Cliente' || user.role === 'Assistant' ? 'none' : '',
                                    }}
                                    onClick={() => {
                                        addTask()
                                    }}>
                                    <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    console.log(row)
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
