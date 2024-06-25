import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddProjectForm from '../../Forms/ProjectForm/AddProjectForm';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {resetTask, addProject, fetchTasks} from '../../../Redux/taskReducer';
import { getSchedule } from '../../../Redux/userReducer';
import { fetchGanttChart,fetchDashboard } from '../../../Redux/dashboardReducer';

const AddProjectPop = React.forwardRef(function AddProjectPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [newTask, setNewTask] = React.useState('')
    const { status, projectStatus } = useSelector(state => state.TaskReducer)
    const { user } = useSelector(state => state.Auth)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {
        if (projectStatus.message) {
            swal(
                {
                    title: `${t("success")}`,
                    text: `${t("project_added")}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )
            // console.log(projectStatus)
            // dispatch(addProject({...projectStatus.project,tasks:[]}))

            // dispatch(fetchTasks(user.user_id))
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
            dispatch(resetTask())
            setOpen(false)
        }
    }, [projectStatus])

    return (
        <div>
            <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{ display: 'none' }}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="addContact"
                aria-describedby="addContactDescription"
            >
                <DialogTitle id="addContact">
                    {t('add_project')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                        {/* Add task */}
                        <AddProjectForm setNewTask={setNewTask} />
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
})
export default AddProjectPop
