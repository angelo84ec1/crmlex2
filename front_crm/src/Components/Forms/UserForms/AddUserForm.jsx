import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useSelector, useDispatch } from "react-redux";
import MenuItem from '@mui/material/MenuItem';
import { addUser } from "../../../Redux/userReducer";
import { IconButton } from "@mui/material";


const roles = [
    {
        value: 'Administrador',
        label: 'Administrador',
    },
    {
        value: 'Assistant',
        label: 'Asistente',
    },
    {
        value: 'Cliente',
        label: 'Cliente',
    },
    {
        value: 'Supervisor',
        label: 'Supervisor',
    },

];


export default function AddUserForm() {

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
        name: yup.string().min(4, `${t("name_short")}`).required(`${t("name_required")}`),
        email: yup.string().email('invalid_email').required(`${t("email_required")}`),
        role: yup.string().required(`${t("required")}`),
        phone: yup.string().required(`${t("phone_required")}`),
        password: yup.string().trim().min(5, `${t("short_password")}`).required(`${t("password_required")}`),
        // confirmPassword: yup.string().trim().oneOf([yup.ref('password'), null], 'Password dsn`t match'),

    }).required();

    ``
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });



    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {

        dispatch(addUser({ ...data, added_by: user.user_id, user_pic: selectedImg }))
        //  console.log(data)

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


                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: `${t("required")}` }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-select-currency"
                                        select
                                        label={t("role")}
                                        defaultValue=""
                                        helperText={errors.role?.message}
                                        error={errors.role?.message}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        {roles.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>



                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) =>
                                    <TextField
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


                        {/* <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        // required
                                        {...field}
                                        fullWidth
                                        name="confirmPassword"
                                        label={t("confirmPassword")}
                                        type="password"
                                        size='small'
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        defaultValue=""
                                        error={errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />}
                            />
                        </Grid>



 */}





                    </Grid>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        // disabled={img===null}
                        sx={{
                            mt: 2,
                            backgroundColor: 'var(--primary-color)'
                            ,
                            '&:hover': {
                                backgroundColor: 'var(--secondary-color)',
                                color: 'black',
                            },

                        }}
                        loading={status === 'loading'}

                    >
                        {t('add_user')}
                    </LoadingButton>
                </Box>


            </form>


        </ThemeProvider>

    );
}