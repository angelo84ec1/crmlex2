import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {DialogContent,DialogActions} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import DeleteUserCard from '../../Card/DeleteUderCard';
import { useSelector } from 'react-redux';
const ViewUser = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const {t}=useTranslation()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
const {currentUser}=useSelector(state=>state.Users)
    return (
        <div>
            <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{display:'none'}}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('view_user')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <DeleteUserCard  data={currentUser}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button> */}
                    <Button onClick={handleClose}
                    variant='contained'
                     autoFocus>
                        {t('close')}
                    </Button>
                </DialogActions>
          
            </Dialog>
        </div>
    );
})
export default ViewUser