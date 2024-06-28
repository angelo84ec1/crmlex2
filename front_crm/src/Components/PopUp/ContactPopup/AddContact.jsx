import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddContactForm from '../../Forms/AddContactForm';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../../../Redux/customerReducer';
import { useTranslation } from 'react-i18next';
import { resetUser } from '../../../Redux/userReducer';
import { addCustomerFun } from '../../../Redux/customerReducer';
import { addUserFun } from '../../../Redux/userReducer';
import swal from 'sweetalert'
const AddContactPop = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState('')
    const dispatch = useDispatch()
    const { userStatus, error } = useSelector(state => state.Users)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation()


    // const ref = React.useRef(null)
    //   console.log(currentCustomer)

    React.useEffect(() => {
        if (userStatus.message) {
            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('added')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )
            // console.log(userStatus)
            dispatch(addCustomerFun(userStatus.user))
            dispatch(addUserFun(userStatus.user))
            dispatch(fetchCustomers(userStatus.user))
            dispatch(resetUser())
            setOpen(false)
        }
    }, [userStatus])
    React.useEffect(() => {
        if (error.error) {
            swal(
                {
                    title: `Error`,
                    text: `${error.error}`,
                    icon: 'error',
                    // button: false,
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
                aria-labelledby="addContact"
                aria-describedby="addContactDescription"
            >
                <DialogTitle id="addContact">
                    {t('add_contact')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="addContactDescription">


                        <AddContactForm setCustomer={setCustomer} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </div>
    );
})
export default AddContactPop