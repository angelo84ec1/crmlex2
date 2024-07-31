// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useTranslation } from 'react-i18next';
// import { LoadingButton } from '@mui/lab';
// import { useSelector,useDispatch } from 'react-redux';
// import swal from 'sweetalert';
// import {deleteTask, fetchTasks} from '../../../Redux/taskReducer';
// import { deleteProject } from '../../../Redux/taskReducer';
// import { getSchedule } from '../../../Redux/userReducer';
// import { resetTask } from '../../../Redux/taskReducer';
// import { fetchGanttChart,fetchDashboard } from '../../../Redux/dashboardReducer';

// const DeleteProject = React.forwardRef(function AddTaskPop({ props }, ref) {
//     const [open, setOpen] = React.useState(false);
//     const { t } = useTranslation()
//     const dispatch=useDispatch()
//     const {currentTask,status,delTaskStatus}=useSelector(state=>state.TaskReducer)
//     const {user}=useSelector(state=>state.Auth)
//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     React.useEffect(() => {
//         if (delTaskStatus.message ) {
//             dispatch(deleteProject({
//                 id: currentTask.id,
//             }))

//             swal(
//                 {
//                     title: `${t('success')}`,
//                     text: `${t('deleted_success')}`,
//                     icon: 'success',
//                     button: false,
//                     timer: 1000
//                 }
//             )
//             // dispatch(fetchTasks(user.user_id))
//             // dispatch(getSchedule(user.user_id))
//             // dispatch(fetchDashboard(user.user_id))
//             // dispatch(fetchGanttChart(user.user_id))
//             dispatch(resetTask())
//             setOpen(false)
//         }
//     }, [delTaskStatus])


//     return (
//         <div>
//             <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{display:'none'}}>
//                 Open alert dialog
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert"
//                 aria-describedby="alert-dialog-description"
//                 maxWidth='lg'
//             >
//                 <DialogTitle id="alert">
//                 {t('you_want_to_delete_project')}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText sx={{width:'20rem'}} id="alert-dialog-description">
//                         {currentTask?.project_name}
//                     </DialogContentText>
//                     <DialogContentText id="alert-dialog-description">
//                         {currentTask?.project_startdate} <b>to</b> {currentTask?.project_enddate}
//                     </DialogContentText>
//                     {/* <UserCard data={currentCustomer}/> */}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button 
//                     sx={{color:'var(--primary-color)'}}
//                      onClick={handleClose}>{t('cancel')}</Button>
//                     <LoadingButton 
//                     loading={status==='loading'}
//                      variant='contained' color='error' 
//                      onClick={()=>dispatch(deleteTask(currentTask?.id))}
//                      autoFocus>
//                         {t('delete')}
//                     </LoadingButton>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// })
// export default DeleteProject




import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { deleteTask, fetchTasks, resetTask, deleteProject } from '../../../Redux/taskReducer';
import { getSchedule } from '../../../Redux/userReducer';
import { fetchGanttChart, fetchDashboard } from '../../../Redux/dashboardReducer';

const DeleteProject = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { currentTask, status, delTaskStatus } = useSelector(state => state.TaskReducer);
    const { user } = useSelector(state => state.Auth);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (delTaskStatus.message) {
            handleClose();
            dispatch(deleteProject({ id: currentTask.id }));

            swal({
                title: `${t('success')}`,
                text: `${t('deleted_success')}`,
                icon: 'success',
                button: false,
                timer: 1000,
            });

            dispatch(fetchTasks({ user_id: user.user_id, page: props }));
            // dispatch(getSchedule(user.user_id));
            // dispatch(fetchDashboard(user.user_id));
            dispatch(fetchGanttChart(user.user_id));
            // dispatch(resetTask());
        }
    }, [delTaskStatus]);

    return (
        <div>
            <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{ display: 'none' }}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert">
                    {t('you_want_to_delete_project')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ width: '20rem' }} id="alert-dialog-description">
                        {currentTask?.project_name}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {currentTask?.project_startdate} <b>to</b> {currentTask?.project_enddate}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'var(--primary-color)' }} onClick={handleClose}>
                        {t('cancel')}
                    </Button>
                    <LoadingButton
                        loading={status === 'loading'}
                        variant="contained"
                        color="error"
                        onClick={() => dispatch(deleteTask(currentTask?.id))}
                        autoFocus
                    >
                        {t('delete')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
});
export default DeleteProject;
