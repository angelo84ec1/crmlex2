import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import AddUserForm from '../../Forms/UserForms/AddUserForm';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { resetUser } from '../../../Redux/userReducer';
import { addUserFun } from '../../../Redux/userReducer';
const PopUp = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { userStatus, error } = useSelector(state => state.Users)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    React.useEffect(() => {
        if (userStatus.message) {
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('user_added')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )
            dispatch(addUserFun(userStatus.user))
            setOpen(false)
            dispatch(resetUser())
        }
    }, [userStatus])
    React.useEffect(() => {
        if (error.error) {
            swal(
                {
                    title: `Error`,
                    text: `${error.error}`,
                    icon: 'error',
                    button: false,
                    timer: 3000
                }
            )
            setOpen(false)
            dispatch(resetUser())
        }
    }, [error])

    return (
        <div>
            <Button variant="outlined" ref={ref} onClick={handleClickOpen} sx={{ display: 'none' }}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('add_user')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <AddUserForm />
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
})
export default PopUp