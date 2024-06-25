import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Autocomplete, Chip, OutlinedInput, TextField} from '@mui/material';
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
// import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import MenuItem from '@mui/material/MenuItem';
import { addProject } from "../../../Redux/taskReducer";
import React, {useState} from "react";

import CheckIcon from "@mui/icons-material/Check.js";

export default function AddProjectForm() {

    const theme = useTheme()
    const { user } = useSelector(state => state.Auth)
    const { status, projectTasks } = useSelector(state => state.TaskReducer)
    const { userList } = useSelector(state => state.Users)
    const [ subTaskList, setSubTaskList] = useState([]);
    const [ selectSubTask, setSelectSubTask] = useState([]);

    const dispatch = useDispatch()

    const { t } = useTranslation()

    //validation Schema
    const schema = yup.object().shape({
        title: yup.string().min(5, t('title_short')).required(t('title_required')),
        discription: yup.string().required(t('code_required')),
        customer: yup.array().min(1, 'Can`t be empty'),
        task: yup.array().min(1, 'Can`t be empty'),
        selectedItems: yup.array().min(1, "At least one item must be selected"),
        startDate: yup.date().required('Start date is required'),
    });

    const changeSubTask = (task_id) => {
        const subTaskL = projectTasks.find(task => task.id == task_id);
        if(subTaskL?.sub_task?.length > 0){
            setSubTaskList(subTaskL?.sub_task);
            setSelectSubTask(subTaskL?.sub_task);
        }
    }

    const { handleSubmit, control,formState, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dueDate: null,
            startDate: null,
            customer: [],
            task: [],
            sub_task: selectSubTask,
        }
    });

    const selectedCustomerIds = React.useRef([]);
    const handleSelectionChange = (event, value) => {
        const selectedItems = [];
        const selectedIds = [];
        console.log(value,'valuevaluevalue')
        value.forEach((item) => {
            if (!selectedIds.includes(item.id)) {
                selectedItems.push({ id: item.id, title: item.title });
                selectedIds.push(item.id);
            }
        });
        selectedCustomerIds.current = selectedIds; // Update selectedCustomerIds.current
        setValue("sub_task", selectedItems);
    };
    const isCustomerSelected = (id) => selectedCustomerIds.current.includes(id);

    const setDate = (input) => {
        const date = new Date(input);
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate

    }
    // console.log(customers)


    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {
        console.log(data)
        const givenDate = new Date(setDate(data.startDate));
        const oneYearAfter = new Date(givenDate.getFullYear() + 1, givenDate.getMonth(), givenDate.getDate());
        // console.log({ ...data, user_id: user.user_id, startDate: setDate(data.startDate), endDate: data.dueDate === null ? setDate(oneYearAfter) : setDate(data.dueDate), project_status: 'pending' })
        dispatch(addProject({ ...data, user_id: user.user_id, startDate: setDate(data.startDate), endDate: data.dueDate === null ? setDate(oneYearAfter) : setDate(data.dueDate), project_status: 'pending' }))
        // setNewTask({ ...data, user_id: user.user_id, startDate: setDate(data.startDate), endDate: data.dueDate === null ? setDate(oneYearAfter) : setDate(data.dueDate), project_status: 'pending' })
          console.log(data,'datadatadatadata');
    }


    // const names = subTaskList;
    //
    //
    //
    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPersonName(
    //         value,
    //     );
    // };

    // const handleDelete = (chipToDelete) => () => {
    //     console.log(chipToDelete,'chipToDelete')
    //     // setPersonName((chips) => personName.filter((chip) => chip.key !== chipToDelete.key));
    //     setPersonName((personName) => personName.filter((chip) => chip.id !== chipToDelete.id));
    // };

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
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        margin="normal"
                                        label={t("project_name")}
                                        defaultValue=""
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
                                            value={field.value}
                                            sx={{ width: '100%',mt:1 }}
                                            helperText={errors.startDate?.message}
                                            error={errors.startDate?.message}
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
                                            sx={{ width: '100%',mt:1 }}
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
                                        sx={{ width: '100%',mt:2 }}
                                        id="outlined-select-currency"
                                        select
                                        label={t('user')}
                                        defaultValue=""
                                        helperText={errors.customer?.message}
                                        error={!!errors.customer}
                                        fullWidth
                                        variant="outlined"
                                        value={field.value.length ? field.value[0].id : ''} // Update the value prop
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
                                name="task"
                                control={control}
                                rules={{ required: 'Customer is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        sx={{ width: '100%',mt:2 }}
                                        id="outlined-select-currency"
                                        select
                                        label={t('task')}
                                        defaultValue=""
                                        helperText={errors.task?.message}
                                        error={!!errors.task}
                                        fullWidth
                                        variant="outlined"
                                        value={field.value.length ? field.value[0].id : ''} // Update the value prop
                                        onChange={(e) => {
                                            const taskOption = projectTasks.find((option) => option.id === parseInt(e.target.value));
                                            field.onChange([{ id: taskOption.id, title: taskOption.title }]);
                                            changeSubTask(taskOption.id);
                                        }}
                                    >
                                        {projectTasks.filter((row) => {
                                            return row.description.toLowerCase() !== 'adding task in client'
                                        }).map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.title}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="sub_task"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        sx={{ width: '100%', mt:2 }}
                                        multiple
                                        disabled={user.role === "Cliente" ? true : false}
                                        options={subTaskList}
                                        getOptionLabel={(option) => option.title}
                                        disableCloseOnSelect
                                        value={field.value}

                                        onChange={(event, value) => {
                                            handleSelectionChange(event, value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                placeholder={t('subtask')}
                                                error={!!formState.errors.selectedItems}
                                                helperText={formState.errors.selectedItems?.message}
                                            />
                                        )}
                                        renderOption={(props, option, { selected }) => (
                                            <MenuItem
                                                {...props}
                                                key={option.id}
                                                value={option}
                                                onChange={() => console.log('helo')}
                                                sx={{
                                                    justifyContent: "space-between",
                                                    backgroundColor: selected ? "#e0e0e0" : "inherit",
                                                }}
                                            >
                                                {option.title}
                                                {isCustomerSelected(option.id) ? <CheckIcon color="info" /> : null}
                                            </MenuItem>
                                        )}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="discription"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black',mt:2 }}
                                        {...field}
                                        autoComplete="given-name"
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        name="discription"
                                        fullWidth
                                        id="discription"
                                        label={t("discription")}
                                        multiline
                                        rows={2}
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
                                sx={{
                                    mt:2,
                                    float: 'right'
                                }}
                            >
                                {t('add_project')}
                            </LoadingButton>
                        </Grid>


                    </Grid>
                </Box>







            </form>


        </ThemeProvider>

    );
}
