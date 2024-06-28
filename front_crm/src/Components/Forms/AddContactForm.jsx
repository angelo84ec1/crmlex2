import React from "react";
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
import { addUser } from "../../Redux/userReducer";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from "@mui/material/IconButton/IconButton";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

export default function AddContactForm({ setCustomer }) {

    const { t } = useTranslation();
    const theme = useTheme()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.Auth)
    const { status } = useSelector(state => state.Users)
    const [img, setImg] = React.useState(null);
    const [selectedImg, setSelectedImg] = React.useState(null);

    const handleImageUpload = (event) => {
        setSelectedImg(event.target.files[0])
        setImg(URL.createObjectURL(event.target.files[0]));
    };

    //validation Schema
    const schema = yup.object({
        // price: yup.string().trim().required(`${t("password_required")}`),
        name: yup.string().min(5, `${t("name_short")}`).required(`${t("name_required")}`),
        email: yup.string().email('email required').required(`${t("email_required")}`),
        phone: yup.string().required(`${t("phone_required")}`),
        password: yup.string().trim().min(5, `${t("short_password")}`).required(`${t("password_required")}`),
        company_name: yup.string().required(`${t("companyName_required")}`),
        // image: yup
        // .mixed()
        // .required('Image is required')
        // .test('fileSize', 'File size is too large', (value) => {
        //   if (!value) return true; // Skip validation if no file is selected
        //   return value.size <= 1048576; // 1MB limit (adjust as needed)
        // })
        // .test('fileType', 'Unsupported file format', (value) => {
        //   if (!value) return true; // Skip validation if no file is selected
        //   return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        // }),

        // forecast: yup.string().required(`${t("forecast_required")}`),
        // activity: yup.string().required(`${t("activity_required")}`),

    }).required();


    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });



    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = async data => {


        const formData = new FormData();
        formData.append('user_pic', selectedImg);
      
    

        dispatch(addUser({ ...data, user_id: user.user_id, role: 'Cliente', added_by: user.user_id,user_pic:selectedImg }))

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

                    <Grid container spacing={0}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${img})`, backgroundSize: 'cover', height: '10rem', mt: 2, borderRadius: 5 }}>
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                                        <PhotoCamera  />
                                    </IconButton>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8} md={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    error={errors.name}
                                                    margin="normal"
                                                    inputProps={{
                                                        style: { textTransform: 'capitalize' },
                                                    }}
                                                    label={t('name')}
                                                    defaultValue=""
                                                    fullWidth
                                                    size="small"
                                                    sx={{ mb: -1 }}
                                                    variant="outlined"
                                                    helperText={errors.name?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    error={errors.email}
                                                    type="email"
                                                    margin="normal"
                                                    label={t('email')}
                                                    defaultValue=""
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    helperText={errors.email?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    error={errors.phone}
                                                    sx={{ mt: 1 }}
                                                    margin="normal"
                                                    label={t('phone')}
                                                    defaultValue=""
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    helperText={errors.phone?.message}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        {/* <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="forecast"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.forecast}
                                        id="margin"
                                        margin="normal"
                                        label={t("forecast")}
                                        defaultValue=""
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.forecast?.message}

                                    />
                                }
                            />
                        </Grid> */}

                        {/* 
                        <Grid item xs={12} sm={12} md={12}>

                            <Controller
                                name="activity"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.activity}
                                        id="margin"
                                        margin="normal"
                                        label={t("activity")}
                                        defaultValue=""
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.activity?.message}

                                    />
                                }
                            />
                        </Grid> */}





                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="company_name"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black' }}
                                        {...field}
                                        autoComplete="given-name"
                                        name="company_name"
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        // required
                                        fullWidth
                                        id="company_name"
                                        label={t("companyName")}
                                        size="small"
                                        defaultValue=""

                                        error={errors.company_name}
                                        helperText={errors.company_name?.message}
                                    />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ mt: 2 }}
                                        // required
                                        {...field}
                                        fullWidth
                                        name="password"
                                        label={t("password")}
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        defaultValue=""
                                        size='small'
                                        error={errors.password}
                                        helperText={errors.password?.message}
                                    />}
                            />
                        </Grid>


                    </Grid>


                    <LoadingButton
                        variant="contained"
                        type="submit"
                        // disabled={img===null}
                        sx={{
                            mt: 1,
                            backgroundColor: 'var(--primary-color)'
                            ,
                            '&:hover': {
                                backgroundColor: 'var(--secondary-color)',
                                color: 'black',
                            },

                        }}
                        loading={status == 'loading'}
                    >
                        {t('add_user')}
                    </LoadingButton>


                    {/* <Toast ref={ref} message={'Cliente Creado'} /> */}
                </Box>
            </form>


        </ThemeProvider>

    );
}
