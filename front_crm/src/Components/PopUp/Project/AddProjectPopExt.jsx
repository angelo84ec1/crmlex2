// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import AddProjectFormExt from '../../Forms/ProjectForm/AddProjectFormExt';
// import swal from 'sweetalert';
// import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import {resetTask, fetchProjectTasks, fetchTasks} from '../../../Redux/taskReducer';
// import { getSchedule } from '../../../Redux/userReducer';
// import { fetchGanttChart,fetchDashboard } from '../../../Redux/dashboardReducer';
// import AddTaskForm from '../../Forms/AddTaskForm';

// const AddProjectPopExt = React.forwardRef(function AddProjectPop({ props }, ref) {
//     const [open, setOpen] = React.useState(false);
//     const dispatch = useDispatch()
//     const [newTask, setNewTask] = React.useState('')
//     const { status, taskStatus } = useSelector(state => state.TaskReducer)
//     const { user } = useSelector(state => state.Auth)
//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };
//     const { t } = useTranslation()

//     React.useEffect(() => {
//         if (taskStatus.message) {
//             swal(
//                 {
//                     title: `${t("success")}`,
//                     text: taskStatus.message,
//                     icon: 'success',
//                     button: false,
//                     timer: 3000
//                 }
//             )
//             // console.log(projectStatus)
//             // dispatch(addProject({...projectStatus.project,tasks:[]}))

//             dispatch(fetchTasks(user.user_id))
//             // dispatch(getSchedule(user.user_id))
//             // dispatch(fetchDashboard(user.user_id))
//             // dispatch(fetchGanttChart(user.user_id))
//             // dispatch(fetchProjectTasks())
//             dispatch(resetTask())
//             console.log("??????????????")
//             handleClose()
//         }
//     }, [taskStatus])

//     return (
//         <div>
//             <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{ display: 'none' }}>
//                 Open alert dialog
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="addContact"
//                 aria-describedby="addContactDescription"
//             >
//                 <DialogTitle id="addContact">
//                     {t('add_task')}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="addContactDescription">
//                         {/* Add task */}
//                         <AddProjectFormExt setNewTask={setNewTask} />
//                     </DialogContentText>
//                 </DialogContent>
//                 {/* <DialogActions>
//                     <Button onClick={handleClose}>Disagree</Button>
//                     <Button onClick={handleClose} autoFocus>
//                         Agree
//                     </Button>
//                 </DialogActions> */}
//             </Dialog>
//         </div>
//     );
// })
// export default AddProjectPopExt



import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddProjectFormExt from '../../Forms/ProjectForm/AddProjectFormExt';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetTask, fetchTasks, addProject } from '../../../Redux/taskReducer';

const AddProjectPopExt = React.forwardRef(function AddProjectPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
   const { status, taskStatus } = useSelector(state => state.TaskReducer)
    const { user } = useSelector(state => state.Auth);
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (project) => {
        dispatch(addProject(project));
    };

    React.useEffect(() => {
        if (taskStatus.message) {
            handleClose();
            swal({
                title: `${t("success")}`,
                text: taskStatus.message,
                icon: 'success',
                button: false,
                timer: 3000,
            });

            dispatch(fetchTasks({ user_id: user.user_id, page: props }));
            // dispatch(resetTask());
            
        }
    }, [taskStatus]);

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
                        <AddProjectFormExt onSubmit={handleSubmit} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
});
export default AddProjectPopExt;
