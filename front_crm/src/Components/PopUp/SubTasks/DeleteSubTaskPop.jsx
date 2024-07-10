import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { useSelector,useDispatch } from 'react-redux';
import swal from 'sweetalert';
import {fetchProjectTasks, fetchTasks, resetTask} from '../../../Redux/taskReducer';
import { deleteSubTask } from '../../../Redux/taskReducer';
import { delSubTaskFun } from '../../../Redux/taskReducer';
import { fetchGanttChart,fetchDashboard } from '../../../Redux/dashboardReducer';
import {getSchedule} from "../../../Redux/userReducer.js";
const DeleteSubTaskPop = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation()
    const dispatch=useDispatch()
    // const {currentCustomer,taskStatus,customersStatus}=useSelector(state=>state.Customer)
    const {currentTask,status,delSubTaskStatus}=useSelector(state=>state.TaskReducer)
    const {user}=useSelector(state=>state.Auth)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

// console.log(currentTask)

    React.useEffect(() => {
        if (delSubTaskStatus.message ) {
            console.log("subtask deleted successfully")
            handleClose();
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('deleted')}`,
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
    }, [delSubTaskStatus])


    return (
        <div>
            <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{display:'none'}}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert"
                aria-describedby="alert-dialog-description"
                maxWidth='lg'
            >
                <DialogTitle id="alert">
                ¿Estás seguro de eliminar la tarea?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{width:'20rem'}} id="alert-dialog-description">
                        {currentTask?.subtask_name}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <h4>{currentTask?.title}</h4>
                        {currentTask?.start_date} <b>to</b> {currentTask?.end_date}
                        
                    </DialogContentText>
                    {/* <UserCard data={currentCustomer}/> */}
                </DialogContent>
                <DialogActions>
                    <Button 
                    sx={{color:'var(--primary-color)'}}
                     onClick={handleClose}>{t('cancel')}</Button>
                    <LoadingButton 
                    loading={status==='loading'}
                     variant='contained' color='error' 
                     onClick={()=>dispatch(deleteSubTask(currentTask?.id))}
                     autoFocus>
                        {t('delete')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
})
export default DeleteSubTaskPop
