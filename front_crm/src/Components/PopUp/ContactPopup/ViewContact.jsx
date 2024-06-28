import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import UserCard from '../../Card/UserCard';

import { useSelector } from 'react-redux';

const ViewContact = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation()
    const {currentCustomer}=useSelector(state=>state.Customer)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                maxWidth='lg'
            >
                <DialogTitle id="alert-dialog-title">
                    {t('view_contact')}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        view contact
                    </DialogContentText> */}
                    <UserCard data={currentCustomer} />
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
export default ViewContact