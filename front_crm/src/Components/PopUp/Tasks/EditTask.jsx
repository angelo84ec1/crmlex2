import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {fetchProjectTasks, fetchTasks, resetTask} from '../../../Redux/taskReducer';
import EditTaskForm from '../../Forms/TaskForm.jsx/EditTaskForm';
import { updateTask } from '../../../Redux/taskReducer';
import { getSchedule } from '../../../Redux/userReducer';
import { fetchDashboard } from '../../../Redux/dashboardReducer';
import { fetchGanttChart } from '../../../Redux/dashboardReducer';

const EditTask = React.forwardRef(function EditTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const {  editNewTask } = useSelector(state => state.TaskReducer)
    const { user} = useSelector(state => state.Auth)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {

        if (editNewTask.message) {
            handleClose();
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated_success')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )
            dispatch(fetchTasks({ user_id: user.user_id, page: props }));
            // dispatch(fetchTasks(user.user_id))
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
            // dispatch(fetchProjectTasks())
            // dispatch(resetTask())
        }
    }, [editNewTask])

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
                    {t('edit_task')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                        {/* Edit task */}
                    </DialogContentText>
                <EditTaskForm  />
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
export default EditTask
