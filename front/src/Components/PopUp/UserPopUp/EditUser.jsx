import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import swal from 'sweetalert';
import { resetUser } from '../../../Redux/userReducer';
import { editUserFun } from '../../../Redux/userReducer';
import { useSelector,useDispatch } from 'react-redux';
import EditUserForm from '../../Forms/UserForms/EditUserForm';
const EditUser = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const dispatch=useDispatch()
    const {userStatus}=useSelector(state=>state.Users)
    const { t } = useTranslation()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    React.useEffect(() => {
        if (userStatus.msg) {
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated_success')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )
            dispatch(editUserFun(userStatus.data))
            dispatch(resetUser())
            setOpen(false)
        }
    }, [userStatus])
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
                    {t('delete_user')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <EditUserForm/>
                    </DialogContentText>
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
export default EditUser