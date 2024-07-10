import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {fetchTasks, resetTask} from '../../../Redux/taskReducer';
import EditTaskForm from '../../Forms/ProjectForm/EditProjectForm';
import { updateProject } from '../../../Redux/taskReducer';
import { getSchedule } from '../../../Redux/userReducer';
import { fetchDashboard } from '../../../Redux/dashboardReducer';
import { fetchGanttChart } from '../../../Redux/dashboardReducer';

const EditProjectPop = React.forwardRef(function EditProjectPop({ props }, ref) {
    const {  editNewProject } = useSelector(state => state.TaskReducer)
    const { user } = useSelector(state => state.Auth)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    // const [newTask, setNewTask] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {
        if (editNewProject.message) {
            handleClose();
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated_success')}`,
                    icon: 'success',
                    button: false,
                    timer: 2000
                }
            )

            // dispatch(resetTask())
            dispatch(fetchTasks({ user_id: user.user_id, page: props }));
            // dispatch(fetchTasks(user.user_id))
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
        }
    }, [editNewProject])

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
                    {t('edit_project')}
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
export default EditProjectPop
