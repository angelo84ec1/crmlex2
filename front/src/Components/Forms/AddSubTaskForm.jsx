import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grid } from "@mui/material";
// import swal from 'sweetalert'
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addSubTasks } from "../../Redux/taskReducer";
import MenuItem from "@mui/material/MenuItem";

export default function AddSubTaskForm({ setNewTask }) {

    const theme = useTheme()
    const { user } = useSelector(state => state.Auth)
    const { userList } = useSelector(state => state.Users)
    const { status, currentTask } = useSelector(state => state.TaskReducer)
    const dispatch = useDispatch()

    const { t } = useTranslation()


    //validation Schema
    const schema = yup.object({
        title: yup.string().min(5, `${t("title_short")}`).required(`${t("title_required")}`),
        discription: yup.string().required(`${t("code_required")}`),
        customer: yup.array().min(1, 'Can`t be empty'),
        dueDate: yup.date().required('Due date is required'),
        startDate: yup.date().required('start date is required'),
    }).required();

    const dateFormat = (dateIn) => {
        const date = new Date(dateIn);
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate
    }

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dueDate: null,
            startDate: null
        }
    });

    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {
        dispatch(addSubTasks({ ...data, user_id: user.user_id, startDate: dateFormat(data.startDate), dueDate: dateFormat(data.dueDate),task_id:currentTask.id,project_id:currentTask.project_id }))
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
                                        label={t("project_name")}
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        fullWidth
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label={t('start_date')}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: '100%', mt: 1 }}
                                            onChange={(date) => field.onChange(date.$d)}
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
                                            sx={{ width: '100%', mt: 1 }}
                                            onChange={(date) => field.onChange(date)}
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="customer"
                                control={control}
                                rules={{ required: 'Customer is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-select-currency"
                                        select
                                        label={t('user')}
                                        helperText={errors.customer?.message}
                                        error={!!errors.customer}
                                        fullWidth
                                        variant="outlined"
                                        sx={{ width: '100%', mt: 2 }}
                                        // value={field.value.length ? field.value[0].id : ''} // Update the value prop
                                        onChange={(e) => {
                                            const selectedOption = userList.find((option) => option.id === parseInt(e.target.value));
                                            field.onChange([{ id: selectedOption.id, name: selectedOption.name }]);
                                        }}
                                    >
                                        {userList.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="discription"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black', mt: 2 }}
                                        {...field}
                                        autoComplete="given-name"
                                        name="discription"
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
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

                        <Grid xs={12} sm={12} >
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
                                {t('add_task')}
                            </LoadingButton>
                        </Grid>


                    </Grid>
                </Box>

            </form>


        </ThemeProvider>

    );
}
