import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
// import { addCustomer } from "../../Redux/customerReducer";
import { updateCustomer } from "../../../Redux/customerReducer";

export default function EditContactForm({ setCustomer }) {

    const { t } = useTranslation();
    const theme = useTheme()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.Auth)
    const { currentCustomer, customersStatus } = useSelector(state => state.Customer)
    // console.log(currentCustomer)

    //validation Schema
    const schema = yup.object({
        // price: yup.string().trim().required(`${t("password_required")}`),
        name: yup.string().min(5, `${t("name_short")}`).required(`${t("name_required")}`),
        email: yup.string().email('email required').required(`${t("email_required")}`),
        phone: yup.string().required(`${t("phone_required")}`),
        forecast: yup.string().required(`${t("forecast_required")}`),
        // activity: yup.string().required(`${t("activity_required")}`),
        companyName: yup.string().required(`${t("companyName_required")}`),

    }).required();


    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

// console.log(currentCustomer)

    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {
        // console.log({ ...data,id:currentCustomer.id})
        setCustomer({  ...data,id:currentCustomer.id,pic:currentCustomer.customer_pic,user_id:currentCustomer.user_id})
        // setCurrentCustomer(data)
        // console.log({ ...data,id:currentCustomer.id,pic:currentCustomer.customer_pic})
        dispatch(updateCustomer({ ...data,id:currentCustomer.id,pic:currentCustomer.customer_pic,user_id:currentCustomer.user_id}))


    }


    return (
        <ThemeProvider theme={theme}>



            <form onSubmit={handleSubmit(onSubmit)} >
                {/* <Box sx={{ height: '3rem', backgroundColor: theme.palette.primary.main, width: '100%' }}>

</Box> */}

                <Box sx={{
                    display: 'flex', flexDirection: 'column', margin: 'auto',
                    p: 1
                }}>
                    {/* <Typography variant="h5" align="center"  >
                        {t('add_products')}
                    </Typography> */}

                    <Grid container spacing={1}>




                        <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="name"
                                defaultValue={currentCustomer.customer_name}
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.name}
                                        // id="margin"
                                        margin="normal"
                                        label={t("name")}
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.name?.message}

                                    />
                                }
                            />
                        </Grid>


                        <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="email"
                                defaultValue={currentCustomer.customer_email}
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.email}
                                        // id="margin"
                                        type='email'
                                        margin="normal"
                                        label={t("email")}
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.email?.message}

                                    />
                                }
                            />
                        </Grid>



                        <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="phone"
                                defaultValue={currentCustomer.customer_phone}
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.phone}
                                        // id="margin"
                                        margin="normal"
                                        label={t("phone")}
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.phone?.message}

                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="forecast"
                                defaultValue={currentCustomer.customer_forecast}
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.forecast}
                                        id="margin"
                                        margin="normal"
                                        label={t("forecast")}
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.forecast?.message}

                                    />
                                }
                            />
                        </Grid>


                        <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="activity"
                                defaultValue={currentCustomer.recent_activity}
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.activity}
                                        id="margin"
                                        margin="normal"
                                        label={t("activity")}
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.activity?.message}

                                    />
                                }
                            />
                        </Grid>





                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="companyName"
                                defaultValue={currentCustomer.customer_company_name}
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black' }}
                                        {...field}
                                        autoComplete="given-name"
                                        name="companyName"
                                        // required
                                        fullWidth
                                        id="companyName"
                                        label={t("companyName")}
                                        size="small"

                                        error={errors.companyName}
                                        helperText={errors.companyName?.message}
                                    />}
                            />
                        </Grid>




                    </Grid>


                    <LoadingButton
                        variant="contained"
                        type="submit"
                        sx={{
                            mt: 1,
                            backgroundColor: 'var(--primary-color)'
                            ,
                            '&:hover': {
                                backgroundColor: 'var(--secondary-color)',
                                color: 'black',
                            },

                        }}
                        loading={customersStatus == 'loading'}
                    >
                        {t('edit_contact')}
                    </LoadingButton>


                    {/* <Toast ref={ref} message={'Cliente Creado'} /> */}
                </Box>
            </form>


        </ThemeProvider>

    );
}
