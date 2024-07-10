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
import { updateSubTask } from '../../../Redux/taskReducer';
import SubTaskStatusForm from '../../Forms/SubTaskForm.jsx/SubTaskStatusForm';
import { Box } from '@mui/material';
import {getSchedule} from "../../../Redux/userReducer.js";
import {fetchDashboard, fetchGanttChart} from "../../../Redux/dashboardReducer.js";
const SubTaskStatus = React.forwardRef(function SubTaskStatus({ props }, ref) {
    
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const { editsubtaskstatus } = useSelector(state => state.TaskReducer)
    const { user} = useSelector(state => state.Auth)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

    React.useEffect(() => {
        if (editsubtaskstatus.message) {
            handleClose();
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated_status')}`,
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
    }, [editsubtaskstatus])

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
                    <Box sx={{width:'20rem'}}>
                    <SubTaskStatusForm/>

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
export default SubTaskStatus
