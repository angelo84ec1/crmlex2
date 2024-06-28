import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {editNewSubTask, fetchProjectTasks, fetchTasks, resetTask} from '../../../Redux/taskReducer';
import EditSubTaskForm from '../../Forms/SubTaskForm.jsx/EditSubTaskForm';
import {getSchedule} from "../../../Redux/userReducer.js";
import {fetchDashboard, fetchGanttChart} from "../../../Redux/dashboardReducer.js";
const EditTaskPop = React.forwardRef(function EditTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const { editNewSubTask,currentTask } = useSelector(state => state.TaskReducer)
    const { user } = useSelector(state => state.Auth)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {
        // console.log(editStatus)
        if (editNewSubTask.message) {
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated')}`,
                    icon: 'success',
                    button: false,
                    timer: 2000
                }
            )
            // dispatch(fetchTasks(user.user_id))
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
            // // dispatch(fetchProjectTasks())
            dispatch(resetTask())
            setOpen(false)
        }
    }, [editNewSubTask])

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
                    {t('edit_subtask')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                        {/* Edit task */}
                    </DialogContentText>
                    <EditSubTaskForm />
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
export default EditTaskPop
