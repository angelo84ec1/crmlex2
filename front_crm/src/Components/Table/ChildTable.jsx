import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import AddTaskPop from '../PopUp/Tasks/AddTaskPop';
import { useSelector, useDispatch } from 'react-redux';
import AddSubTaskPop from '../PopUp/SubTasks/AddSubTaskPop';
import { setCurrentTask } from '../../Redux/taskReducer';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditTaskPop from '../PopUp/Tasks/EditTask';
import DeleteTaskPop from '../PopUp/Tasks/DeleteTask';
import EditSubTaskPop from '../PopUp/SubTasks/EditSubTaskPop';
import DeleteSubTaskPop from '../PopUp/SubTasks/DeleteSubTaskPop';
import TaskStatus from '../PopUp/Tasks/TaskStatus';
import SubTaskStatus from '../PopUp/SubTasks/SubTaskStatus';
import MultiSelect from '../UseAble/MultiSelect';
import { Typography } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AddEmailPopUp from '../PopUp/SubTasks/AddEmailPopUp';
import { setCurrentProject } from '../../Redux/taskReducer';
import AddTaskEmailPopUp from '../PopUp/Tasks/Task Email/AddTaskEmailPopUp';
import TaskMultiSelect from "../UseAble/TaskMultiSelect.jsx";
import SubTaskMultiSelect from "../UseAble/SubTaskMultiSelect.jsx";
import AddProjectPopExt from '../PopUp/Project/AddProjectPopExt';
function createData(item) {
  return { item };
}




function Row(props) {
  const { row, setCurrentRow, page } = props;
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.Auth)

  const refSub = React.useRef(null)
  const addSubTask = () => {
    refSub.current.click()
  }

  // --------------------------------------------------------EDIT TASK REF-------------------------------------
  const editTaskRef = React.useRef(null)
  const editTask = () => {
    editTaskRef.current.click()
  }
  // DELETE TASK REF
  const deleteTaskRef = React.useRef(null)
  const deleteTask = () => {
    deleteTaskRef.current.click()
  }
  //EDIT SUBTASK
  const editSubTaskRef = React.useRef(null)
  const editSubTask = () => {
    editSubTaskRef.current.click()
  }
  // DELETE SUBTASK REF
  const deleteSubTaskRef = React.useRef(null)
  const deleteSubTask = () => {
    deleteSubTaskRef.current.click()
  }
  // TASK STATUS REF
  const taskStatus = React.useRef(null)
  const editTaskStatus = () => {
    taskStatus.current.click()
  }
  // SUB TASK STATUS REF
  const subtaskStatus = React.useRef(null)
  const editSubTaskStatus = () => {
    subtaskStatus.current.click()
  }
  // EMAIL POPUP REF
  const emailPopUp = React.useRef(null)
  const EmailPopUp = () => {
    emailPopUp.current.click()
  }
  // EMAIL POPUP REF
  const taskemailPopUp = React.useRef(null)
  const TaskEmailPopUp = () => {
    taskemailPopUp.current.click()
  }


  // console.log( customers
  //   .filter((customer) => +row.id === customer.id)
  //   .map((customer) => customer.customer_name).join(', '))
  return (
    <React.Fragment>

      {/* --------------------------------------TABLE ROWS------------------------------------ */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
            }}
          >

            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.item?.task_name?.title}
        </TableCell>

        <TableCell align='center'>
          <TaskMultiSelect options={
            row.item?.task_name?.assign_user?.map(item => ({ name: item.assin_by.name, id: item.assign_user_id }))
          } currentTask={row.item?.task_name} />
        </TableCell>

        <TableCell align="center"

          onClick={() => {
            // if (user.role !== 'Cliente' && user.role !== 'Supervisor'&&user.role !== 'Assistant') {
            if (user.role === 'Administrador') {
              dispatch(setCurrentTask({ ...row.item?.task_name}))
              editTaskStatus();
            }

          }}

        >
          <Box sx={{
            p: 1, color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',
            backgroundColor: row.item?.task_name?.status === 'completed' ? '#20BF55' :
              row.item?.task_name?.status === 'new' ? '#8E2DE2' :
                row.item?.task_name?.status === 'late' ? '#CD500C' :
                  row.item?.task_name?.status === 'pending' ? '#D9BB41' : '#4A00E0'
          }}>
            {t(row.item?.task_name?.status)}

          </Box>
        </TableCell>
        <TableCell align="center">{row.item?.task_name?.start_date}</TableCell>
        <TableCell align="center">{row.item?.task_name?.end_date}</TableCell>
        {/* TASK  ACTIONS */}
        <TableCell align="center">
          <IconButton
            sx={{ ...style.iconButton, display: user.role === 'Administrador'||user.role === 'Supervisor' ? "" : 'none' }}
            // sx={{ ...style.iconButton, display: user.role === 'Cliente'||user.role === 'Supervisor'||user.role === 'Assistant' && 'none' }}
            onClick={() => {
              console.log(row.item?.project_id, "edit")
              dispatch(setCurrentTask({...row.item?.task_name, project_id: row.item?.project_id } ))
              editTask()
            }}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            // sx={{ ...style.iconButton, display: user.role === 'Assistant' && 'none' || user.role === 'Supervisor' && 'none' || user.role === 'Cliente' && 'none' }}
            sx={{ ...style.iconButton, display: user.role === 'Administrador' ? "" : 'none' }}
            onClick={() => {
              dispatch(setCurrentTask(row.item?.task_name))
              deleteTask()
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton
            sx={{ ...style.iconButton }}
            // sx={{ ...style.iconButton, display: user.role === 'Assistant' && 'none' || user.role === 'Cliente' && 'none' }}
            onClick={() => {
              dispatch(setCurrentTask(row.item))
              TaskEmailPopUp()
            }}
          >
            <MailOutlinedIcon />
          </IconButton>
        </TableCell>
        {/* =----------------------REFFERENCE COMPONENTS------------------------- */}
        <EditTaskPop ref={editTaskRef} props={page} />
        <DeleteTaskPop ref={deleteTaskRef} props={page} />
        <TaskStatus ref={taskStatus} props={page} />
        <EditSubTaskPop ref={editSubTaskRef} props={page} />
        <DeleteSubTaskPop ref={deleteSubTaskRef} props={page} />
        <SubTaskStatus ref={subtaskStatus} props={page} />
        <AddEmailPopUp ref={emailPopUp} props={page} />
        <AddTaskEmailPopUp ref={taskemailPopUp} props={page} />
      </TableRow>


      {/* -----------------------SUB TABLE HEADER---------------------------------------- */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit  className='table-style my-3'>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell/> */}
                    <TableCell style={style.subTableHeading}>{t('subtask')}</TableCell>
                    <TableCell  style={style.subTableHeading} >
                      {t('assignee')}</TableCell>
                    <TableCell style={style.subTableHeading} >{t('status')}</TableCell>
                    <TableCell style={style.subTableHeading} align="center">{t('start_date')}</TableCell>
                    <TableCell style={style.subTableHeading} align="center">{t('due_date')}</TableCell>
                    <TableCell style={style.subTableHeading} align="center">
                      <IconButton
                        sx={{
                          ...style.iconButton,
                          display: user.role != 'Administrador' && row && row.subtasks && row.subtasks.length === 0 ? 'show' : row && row.subtasks && row.subtasks.length > 0 ? 'none' : '',
                        }}
                        onClick={() => {
                          // console.log(row)
                          dispatch(setCurrentTask({project_id: row.item?.project_id, id:row.item?.task_id}))
                          // dispatch(setCurrentProject(row.id))
                          addSubTask()
                        }}>
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* SUB TASK POPUP */}
                  <AddSubTaskPop ref={refSub} />

                  {/*--------------------------------- SUBTABLE BODY------------------------------ */}
                  {row.item?.sub_tasks && row.item?.sub_tasks
                  .filter((tasksRow) => tasksRow.task_id === row.item?.task_id)
                  .map((tasksRow, i) => (
                    <TableRow key={tasksRow.id}>
                      <TableCell component="th" scope="row">
                        {tasksRow.sub_task_name?.title}
                      </TableCell>
                      <TableCell align='center'>
                        <SubTaskMultiSelect options={
                          tasksRow?.sub_task_name?.assign_user?.map(item => ({ name: item.assin_by.name, id: item.assign_user_id }))
                        } currentTask={tasksRow?.sub_task_name} />
                      </TableCell>
                      <TableCell align="center"
                        onClick={() => {
                          if (user.role != "Cliente" && user.role != 'Supervisor' && user.role !== 'Assistant') {
                            dispatch(setCurrentTask(tasksRow?.sub_task_name))
                            editSubTaskStatus()
                          }
                        }}
                      >

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
                      <TableCell align="center">
                        {tasksRow.sub_task_name?.start_date}
                      </TableCell>
                      <TableCell align="center">
                        {tasksRow.sub_task_name?.end_date}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          sx={{ ...style.iconButton, display: user.role === 'Administrador'||user.role === 'Supervisor' ? "" : 'none' }}
                          onClick={() => {
                            dispatch(setCurrentTask({ ...tasksRow?.sub_task_name, project_id: row.item?.project_id, task_id: row.item?.task_id}))
                            editSubTask()
                          }}
                        >
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton
                          // sx={{ ...style.iconButton, display: user.role === 'Assistant' && 'none' || user.role === 'Cliente' && 'none' || user.role === 'Supervisor' && 'none' }}
                          sx={{ ...style.iconButton, display: user.role === 'Administrador' ? "" : 'none' }}
                          onClick={() => {
                            dispatch(setCurrentTask(tasksRow?.sub_task_name))
                            deleteSubTask()
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>

                        <IconButton
                          sx={{ ...style.iconButton }}
                          // sx={{ ...style.iconButton, display: user.role === 'Assistant' && 'none' || user.role === 'Cliente' && 'none' }}
                          onClick={() => {
                            dispatch(setCurrentTask({ ...tasksRow, subtask_name: row.subtask_name }))
                            EmailPopUp()
                          }}
                        >
                          <MailOutlinedIcon />
                        </IconButton>


                        {/*<IconButton*/}
                        {/*  sx={{ ...style.iconButton, display: user.role === 'Cliente' || user.role === 'Assistant' || i >= 1 ? 'none' : '' }}*/}

                        {/*  onClick={() => {*/}
                        {/*    // console.log(row)*/}
                        {/*    dispatch(setCurrentTask(row))*/}
                        {/*    addSubTask()*/}
                        {/*  }}>*/}
                        {/*  <AddIcon />*/}
                        {/*</IconButton>*/}

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
}



export default function ChildTable({ tasks, props }) {
  // console.log('Child Table Props: ' + props);
  const { t } = useTranslation()
  const ref = React.useRef(null)
  const { currentProject } = useSelector(state => state.TaskReducer)
  const { user } = useSelector(state => state.Auth)
  const { currentRow, setCurrentRow } = React.useState('')
  // console.log(tasks)
  const dispatch = useDispatch()
  const addTask = () => {
    ref.current.click()
  }

  const rows =
    tasks[0] != null && tasks.map((item) => {

      return createData(item)

    })
  // console.log(rows)
  React.useState(() => {
  }, [tasks])

  return (
    <TableContainer className='table-style my-3'>
      {/* ----------------------PARENT TABLE ROWS----------------------------------------- */}
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow >
            <TableCell />
            <TableCell style={style.tableHeading} >{t('task')}</TableCell>
            <TableCell style={style.tableHeading} > {t('assignee')}</TableCell>
            <TableCell style={style.tableHeading} align="center">{t('status')}</TableCell>
            <TableCell style={style.tableHeading} align="center">{t('start_date')}</TableCell>
            <TableCell style={style.tableHeading} align="center">{t('due_date')}</TableCell>
            <TableCell style={style.tableHeading} align="center">
              <IconButton
                  sx={{
                    ...style.iconButton,
                    display: user.role === 'Cliente' || user.role === 'Assistant' ? 'none' : '',
                  }}
                  // sx={{ ...style.iconButton, display: user.role === 'Cliente'||user.role === 'Assistant' && 'none' }}
                  onClick={() => {
                    addTask()
                    dispatch(setCurrentTask(rows[0]?.item))
                  }}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows && rows.map((row) => {
            return <Row key={row.name} row={row} setCurrentRow={setCurrentRow} page={props} />;
          })}
        </TableBody>
      </Table>
      <Box sx={{ width: '100%', mt: '1rem', display: `${!tasks.length < 1 && 'none'}` }}>
        <Typography color={'primary'} align='center' >
          {t('empty')}
        </Typography>
      </Box>
      <AddProjectPopExt ref={ref} />
    </TableContainer>
  );
}


const style = {
  tableHeading: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'var(--secondary-color)'
  },
  subTableHeading: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'var(--secondary-color)'
  }, iconButton: {
    backgroundColor: 'var(--primary-color)', color: 'white',
    m: '1px',
    '&:hover': {
      backgroundColor: 'var(--secondary-color)',
      //   color: 'black',
    },
  }
}
