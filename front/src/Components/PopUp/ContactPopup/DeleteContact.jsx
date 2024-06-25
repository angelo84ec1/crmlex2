import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import UserCard from '../../Card/UserCard';
import { deleteCustomerFun } from '../../../Redux/customerReducer';
import { useSelector,useDispatch } from 'react-redux';
import { deleteUser } from '../../../Redux/userReducer';
import { resetUser } from '../../../Redux/userReducer';
import swal from 'sweetalert';
// import { deleteCustomer } from '../../../Redux/customerReducer';
const DeleteContact = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation()
    const dispatch=useDispatch()
    const {currentCustomer}=useSelector(state=>state.Customer)
    const {delUserStatus,status}=useSelector(state=>state.Users)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



React.useState(()=>{
},[delUserStatus])
    React.useEffect(() => {
        if (delUserStatus.status ) {


            dispatch(deleteCustomerFun({
                id: currentCustomer.id,
            }))


            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('deleted')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )

            dispatch(resetUser())
            setOpen(false)
        }
    }, [delUserStatus])


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
                    {t('delete_contact')}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        Delete contct
                    </DialogContentText> */}
                    <UserCard data={currentCustomer}/>
                </DialogContent>
                <DialogActions>
                    <Button 
                    sx={{color:'var(--primary-color)'}}
                     onClick={handleClose}>{t('cancel')}</Button>
                    <LoadingButton 
                    loading={status==='loading'}
                     variant='contained' color='error' onClick={()=>dispatch(deleteUser(currentCustomer.id))} autoFocus>
                        {t('delete')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
})
export default DeleteContact