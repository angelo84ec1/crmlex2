import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetTask } from '../../../Redux/taskReducer';
import { updateSubTask } from '../../../Redux/taskReducer';
import SubTaskStatusForm from '../../Forms/SubTaskForm.jsx/SubTaskStatusForm';
import { Box } from '@mui/material';
import AddEmailForm from '../../Forms/Email/AddEmailForm';

const AddEmailPopUp = React.forwardRef(function AddEmailPopUp({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const { editStatus, currentTask } = useSelector(state => state.TaskReducer)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()

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
                    {currentTask?.project_name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">
                        {/* Edit task */}
                    </DialogContentText>
                    <Box sx={{ width: '40rem' }}>
                        <AddEmailForm />
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
export default AddEmailPopUp
