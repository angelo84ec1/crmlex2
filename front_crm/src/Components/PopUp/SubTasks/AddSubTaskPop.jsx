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
import AddSubTaskForm from '../../Forms/AddSubTaskForm';
import {getSchedule} from "../../../Redux/userReducer.js";
import {fetchDashboard, fetchGanttChart} from "../../../Redux/dashboardReducer.js";

const AddSubTaskPop = React.forwardRef(function AddSubTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [setNewTask] = React.useState('')
    const { user } = useSelector(state => state.Auth)
    const { taskStatus } = useSelector(state => state.TaskReducer)
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
                    title: `${t('success')}`,
                    text: `${t('added')}`,
                    icon: 'success',
                    button: false,
                    timer: 3000
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
                        <AddSubTaskForm setNewTask={setNewTask} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
})
export default AddSubTaskPop
