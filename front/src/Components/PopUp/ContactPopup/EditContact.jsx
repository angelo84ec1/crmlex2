import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import EditContactForm from './EditContactForm';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert'
import { resetStatus, updateCustomerFun } from '../../../Redux/customerReducer';

const EditContact = React.forwardRef(function AddTaskPop({ props }, ref) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { updateStatus } = useSelector(state => state.Customer)
    const [customer, setCustomer] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        if (updateStatus.status === true) {


            dispatch(updateCustomerFun({
                id: customer.id,
                customer_name: customer.name,
                customer_email: customer.email,
                customer_company_name: customer.companyName,
                customer_phone: customer.phone,
                customer_forecast: customer.forecast,
                recent_activity: customer.acitvity
            }))


            swal(
                {
                    title: `${t('success')}`,
                    text: `${t('updated')}`,
                    icon: 'success',
                    button: false,
                    timer: 1000
                }
            )

            dispatch(resetStatus())
            setOpen(false)
        }
    }, [updateStatus])

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
                    {t('edit_contact')}
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description">
                        
                    </DialogContentText> */}
                    <EditContactForm setCustomer={setCustomer} />
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
export default EditContact