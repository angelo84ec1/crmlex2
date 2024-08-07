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
import TaskStatusForm from '../../Forms/TaskForm.jsx/TaskStatusForm';
import { Box } from '@mui/material';
import {getSchedule} from "../../../Redux/userReducer.js";
import {fetchDashboard, fetchGanttChart} from "../../../Redux/dashboardReducer.js";
const TaskStatus = React.forwardRef(function TaskStatus({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const { edittaskStatus } = useSelector(state => state.TaskReducer)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const { user} = useSelector(state => state.Auth)

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {
        if (edittaskStatus.message) {
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated_status')}`,
                    icon: 'success',
                    button: false,
                    timer: 2000
                })
            // dispatch(fetchTasks(user.user_id))
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
            dispatch(fetchProjectTasks())
            dispatch(resetTask())
            setOpen(false)
        }
    }, [edittaskStatus])

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
                maxWidth={false}
            >
                <DialogTitle id="addContact">
                    {t('edit_status')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                        {/* Edit task */}
                    </DialogContentText>
                    <Box sx={{ width: '20rem' }}>

                        <TaskStatusForm />
                    </Box>
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
export default TaskStatus
