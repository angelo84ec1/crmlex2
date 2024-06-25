import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React from "react";
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grid, InputLabel, Slider } from "@mui/material";
// import swal from 'sweetalert'
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { editSubTask } from "../../../Redux/taskReducer";
export default function EditSubTaskForm() {

    const theme = useTheme()
    const { user } = useSelector(state => state.Auth)
    const { status, currentTask } = useSelector(state => state.TaskReducer)
    const dispatch = useDispatch()
    const [progress, setProgressValue] = React.useState(currentTask.progress)
    const { t } = useTranslation()
    //validation Schema
    const schema = yup.object({
        title: yup.string().min(5, `${t("title_short")}`).required(`${t("title_required")}`),
        discription: yup.string().required(`${t("code_required")}`),
        dueDate: yup.date().required('Due date is required'),
        startDate: yup.date().required('start date is required'),

    }).required();

    const dateFormat = (dateIn) => {
        const date = new Date(dateIn);
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        // console.log(formattedDate); // output: "2023 /5/ 10 15:1"
        return formattedDate
    }

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dueDate: dayjs(currentTask.end_date), // set default value in form data
            startDate: dayjs(currentTask.start_date), // set default value in form data
            title: currentTask.title, // set default value in form data
        }
    });


    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {

        dispatch(editSubTask({ ...data, user_id: user.user_id, startDate: dateFormat(data.startDate), dueDate: dateFormat(data.dueDate), id: currentTask.id,progress:progress, project_id: currentTask.project_id, task_id: currentTask.task_id}))
        // console.log(data)
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
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        error={errors.title}
                                        id="margin"
                                        margin="normal"
                                        label={t("subtask_name")}
                                        defaultValue=""
                                        fullWidth
                                        variant='outlined'
                                        helperText={errors.title?.message}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                                        <DateTimePicker
                                            label={t('start_date')}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: '100%', mt: 1 }}
                                            onChange={(date) => field.onChange(date)}
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} >
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
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
                            <InputLabel id="slider-label">{t('progress')}</InputLabel>
                            <Slider
                                // size="small"
                                defaultValue={progress}
                                onChange={(e) => setProgressValue(e.target.value)}
                                aria-labelledby="slider-label"
                                valueLabelDisplay="auto"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="discription"
                                control={control}
                                defaultValue={currentTask.description}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black',mt: 2 }}
                                        {...field}
                                        autoComplete="given-name"
                                        name="discription"
                                        // required
                                        fullWidth
                                        id="discription"
                                        label={t("discription")}
                                        multiline
                                        rows={4}
                                        error={errors.discription}
                                    />}
                            />
                        </Grid>


                    </Grid>
                </Box>

                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={status === 'loading'}
                    sx={{mt:2,float:'right',
                        backgroundColor: 'var(--primary-color)'
                        ,
                        '&:hover': {
                            backgroundColor: 'var(--secondary-color)',
                            color: 'black',
                        },
                    }}
                >
                    {t('edit_subtask')}
                </LoadingButton>
            </form>

        </ThemeProvider>

    );
}
