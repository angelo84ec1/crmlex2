import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grid, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Slider from '@mui/material/Slider';
import {editTask} from "../../../Redux/taskReducer.js";

export default function EditProjectForm() {

    const theme = useTheme()
    const { user } = useSelector(state => state.Auth)
    const { status, currentTask } = useSelector(state => state.TaskReducer)
    const [value, setValue] = React.useState(currentTask.progress)
    const [editCustomer, setEditCustomer] = React.useState(currentTask.project_assign_user_id)
    const selectedCustomerIds = React.useRef([]);
 
    const dispatch = useDispatch()
    const { t } = useTranslation()

    console.log(">>>>>>>>>>>Print",currentTask)
    //validation Schema
    const schema = yup.object({
        title: yup.string().min(5, `${t("title_short")}`).required(`${t("title_required")}`),
        discription: yup.string().required(`${t("code_required")}`),
        dueDate: yup.date().required('Due date is required'),
        startDate: yup.date().required('Due date is required'),

    }).required();

    const dateFormat = (dateIn) => {
        const date = new Date(dateIn);
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        // console.log(formattedDate); // output: "2023 /5/ 10 15:1"
        return formattedDate
    }
    const handleSelectionChange = (event, value) => {
        const selectedIds = value.map((item) => item.id);
        const uniqueIds = [...new Set(selectedIds)]; // Remove duplicate IDs

        selectedCustomerIds.current = uniqueIds;
        setValue("customer", value);
    };
    const isCustomerSelected = (id) => selectedCustomerIds.current.includes(id);
    const { handleSubmit, control, formState: { errors }, register } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dueDate: dayjs(currentTask.project_enddate), // set default value in form data
            startDate: dayjs(currentTask.project_startdate), // set default value in form data
            // customer: []
            // default value is tomorrow

        }
    });

    const handleRoleChange = (event) => {
        setEditCustomer(event.target.value);
    };

    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {
        dispatch(editTask({ ...data, user_id: user.user_id, startDate: dateFormat(data.startDate), dueDate: dateFormat(data.dueDate), id: currentTask.id, project_status: currentTask.project_status, customer: editCustomer, progress: value }))
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Box sx={{
                    display: 'flex', flexDirection: 'column', margin: 'auto',
                    p: 1
                }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue={currentTask.project_name}
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.title}
                                        id="margin"
                                        margin="normal"
                                        label={t("project_name")}
                                        defaultValue=""
                                        fullWidth
                                        size="small"
                                        // sx={{ p: 1 }}
                                        variant='outlined'

                                        helperText={errors.title?.message}

                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} >
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                                        <DateTimePicker

                                            label={t('start_date')}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: '100%', mt: 2 }}
                                            onChange={(date) => field.onChange(date)}
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} >
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            // minDate={new Date()}
                                            label={t('due_date')}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: '100%', mt: 2 }}
                                            onChange={(date) => field.onChange(date)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            {/* <FormControl> */}
                            <InputLabel id="slider-label">{t('progress')}</InputLabel>
                            <Slider
                                // size="small"
                                defaultValue={value}
                                onChange={(e) => setValue(e.target.value)}
                                aria-labelledby="slider-label"
                                valueLabelDisplay="auto"
                            />
                            {/* </FormControl> */}
                        </Grid>



                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="discription"
                                control={control}
                                defaultValue={currentTask.project_description}

                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black' }}
                                        {...field}
                                        autoComplete="given-name"
                                        name="discription"
                                        // required
                                        fullWidth
                                        id="discription"
                                        label={t("discription")}
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        error={errors.discription}
                                    // helperText={errors.publicationData?.message}
                                    />}
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={status === 'loading'}
                                sx={{float:'right'}}
                            // sx={{
                            //     backgroundColor: 'var(--primary-color)'
                            //     ,
                            //     '&:hover': {
                            //         backgroundColor: 'var(--secondary-color)',
                            //         color: 'black',
                            //     },

                            // }}
                            //  loading={true}
                            >
                                {t('add_task')}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>






            </form>


        </ThemeProvider>

    );
}
