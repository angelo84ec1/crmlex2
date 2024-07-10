import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddTaskForm from '../../Forms/AddTaskForm';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {resetTask, fetchProjectTasks, fetchTasks} from '../../../Redux/taskReducer';
import { getSchedule } from '../../../Redux/userReducer';
import { fetchGanttChart,fetchDashboard } from '../../../Redux/dashboardReducer';

const AddTaskPop = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const { taskStatus } = useSelector(state => state.TaskReducer)
    const { user } = useSelector(state => state.Auth)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {
        if (taskStatus.message) {
            handleClose();
            swal(
                {
                    title: `Exito`,
                    text: taskStatus.message,
                    icon: 'success',
                    button: false,
                    timer: 2000
                }
            )
            dispatch(fetchTasks({ user_id: user.user_id, page: props }));
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
            // dispatch(fetchProjectTasks())
            // dispatch(resetTask())
        }
    }, [taskStatus])

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
                    {t('add_task')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                    </DialogContentText>
                        {/* Add task */}
                    <AddTaskForm  />
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
export default AddTaskPop
