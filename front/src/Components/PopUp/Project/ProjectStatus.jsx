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
import ProjectStatusForm from '../../Forms/ProjectForm/ProjectStatusForm';
import { Box } from '@mui/material';
import {getSchedule} from "../../../Redux/userReducer.js";
import {fetchDashboard, fetchGanttChart} from "../../../Redux/dashboardReducer.js";
const ProjectStatus = React.forwardRef(function ProjectStatus({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const { status, projectStatus } = useSelector(state => state.TaskReducer)
    const { user} = useSelector(state => state.Auth)
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
                    title: `${t('success')}`,
                    text: `${t('updated_status')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )

            setOpen(false)
            dispatch(resetTask())
            // dispatch(fetchTasks(user.user_id))
            // dispatch(getSchedule(user.user_id))
            // dispatch(fetchDashboard(user.user_id))
            // dispatch(fetchGanttChart(user.user_id))
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
                maxWidth={false}
            >
                <DialogTitle id="addContact">
                    {t('edit_project_status')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                        {/* Edit task */}
                    </DialogContentText>
                    <Box sx={{ width: '20rem' }}>

                        <ProjectStatusForm />
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
export default ProjectStatus
