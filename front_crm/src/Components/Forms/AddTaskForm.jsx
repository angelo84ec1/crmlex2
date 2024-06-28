import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Checkbox, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addTasks } from "../../Redux/taskReducer";
import MenuItem from "@mui/material/MenuItem";
import { TagsInput } from "react-tag-input-component";
import dayjs from "dayjs";
import XLSX from "xlsx";

export default function AddTaskForm() {
    const theme = useTheme();
    const { user } = useSelector((state) => state.Auth);
    const { status, currentTask, currentProject } = useSelector(
        (state) => state.TaskReducer
    );
    const { userList } = useSelector((state) => state.Users);
    const [subtask, subtaskSelected] = useState([]);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Validation Schema
    const schema = yup.object({
        title: yup.string().min(5, `${t("title_short")}`).required(`${t("title_required")}`),
        discription: yup.string().required(`${t("code_required")}`),
        customer: yup.array().min(1, 'Can`t be empty'),
        startDate: yup.date().required('start date is required'),
        extend_days: yup.boolean().default(false), // Assuming extend_days is a boolean
    }).required();

    const dateFormat = (dateIn) => {
        const date = new Date(dateIn);
        const hours = date.getHours();
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${formattedHours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${amOrPm}`;
        console.log(formattedDate);
        return formattedDate;
    };

    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [subtaskDueDate, setSubtaskDueDate] = useState(null);
    const [subtaskStartDate, setSubtaskStartDate] = useState(null);

    const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            startDate: null,
        },
    });

    const calculateDueDate = (startDate) => {
        if (startDate) {
            const newDueDate = dayjs(startDate).add(1, "day");
            setDueDate(newDueDate);
            setSubtaskDueDate(newDueDate);
        } else {
            setDueDate(null);
            setSubtaskDueDate(null);
        }
    };

    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        setValue('title', taskTitle);
    }, [taskTitle]);

    useEffect(() => {
        setValue('discription', taskDescription);
    }, [taskDescription]);

    useEffect(() => {
        // When the component mounts or when selectedCustomer changes, update the form value
        setValue('customer', selectedCustomer);
    }, [selectedCustomer, setValue]);

    const handleCustomerChange = (e) => {
        const selectedOption = userList.find((option) => option.id === parseInt(e.target.value));
        setSelectedCustomer(selectedOption ? [{ id: selectedOption.id, name: selectedOption.name }] : []);
    };

    const handleImportTaskClick = () => {

        /// Update the state variables
        setTaskTitle('abdullah al mamun');
        setTaskDescription('abdullah al mamun');

        // Your logic for importing tasks and setting values for Date fields
        const importedStartDate = dayjs('2023-11-12 10:59:59'); // Replace this with your actual imported start date
        const importedDueDate = dayjs('2023-11-12 10:59:59'); // Replace this with your actual imported due date

        const importedsubtaskStartDate = dayjs('2023-11-12 10:59:59'); // Replace this with your actual imported start date
        const importedsubtaskDueDate = dayjs('2023-11-12 10:59:59'); // Replace this with your actual imported due date

        setValue('startDate', importedStartDate);
        setValue('dueDate', importedDueDate);

        setValue('subtaskStartDate', importedsubtaskStartDate);
        setValue('subtaskDueDate', importedsubtaskDueDate);

        // Find the "Angelo Luna" option in the userList array
        const angeloLunaOption = userList.find((option) => option.name === 'Angelo Luna');

        // Set the selected option for the customer field
        setSelectedCustomer(angeloLunaOption ? [{ id: angeloLunaOption.id, name: angeloLunaOption.name }] : []);

        // Your logic for importing tasks and setting values for sub_task field
        const importedTags = ['Tag1', 'Tag2', 'Tag3']; // Replace this with your actual imported tags
        subtaskSelected(importedTags);

    };

    const importExcel = (file) => {

        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

            // Extracting values from Excel and populating the form
            const title = firstSheet['A2'].v;
            const customer = firstSheet['D2'].v;
            const description = firstSheet['E2'].v;

            setTaskTitle(title);
            setTaskDescription(description);

            // Handle date value from B2
            let startDat = '';
            if (firstSheet['B2'] && typeof firstSheet['B2'].v === 'number') {
                const excelDateValue = firstSheet['B2'].v;
                const jsDateObject = new Date((excelDateValue - (25567 + 2)) * 86400 * 1000); // Convert Excel date to JavaScript date
                startDat = jsDateObject.toISOString().slice(0, 19).replace("T", " "); // Format as YYYY-MM-DD HH:MM:SS
            } else {
                startDat = firstSheet['B2'] ? firstSheet['B2'].v : '';
            }

            // Handle date value from B2
            let dueDat = '';
            if (firstSheet['C2'] && typeof firstSheet['C2'].v === 'number') {
                const excelDateValue = firstSheet['C2'].v;
                const jsDateObject = new Date((excelDateValue - (25567 + 2)) * 86400 * 1000); // Convert Excel date to JavaScript date
                dueDat = jsDateObject.toISOString().slice(0, 19).replace("T", " "); // Format as YYYY-MM-DD HH:MM:SS
            } else {
                dueDat = firstSheet['C2'] ? firstSheet['C2'].v : '';
            }

            console.log(startDate);
            console.log(dueDate);

            // Your logic for importing tasks and setting values for Date fields
            const importedStartDate = dayjs(startDat); // Replace this with your actual imported start date
            const importedDueDate = dayjs(dueDat); // Replace this with your actual imported due date

            const importedsubtaskStartDate = dayjs(startDat); // Replace this with your actual imported start date
            const importedsubtaskDueDate = dayjs(dueDat); // Replace this with your actual imported due date

            setValue('startDate', importedStartDate);
            setValue('dueDate', importedDueDate);

            setValue('subtaskStartDate', importedsubtaskStartDate);
            setValue('subtaskDueDate', importedsubtaskDueDate);
            

            // Find the "Angelo Luna" option in the userList array
            const angeloLunaOption = userList.find((option) => option.name === customer);

            // Set the selected option for the customer field
            setSelectedCustomer(angeloLunaOption ? [{ id: angeloLunaOption.id, name: angeloLunaOption.name }] : []);

            // Your logic for importing tasks and setting values for sub_task field

            // Other data from F2 to FE2
            let otherData = [];
            
            for (let column = 'F'.charCodeAt(0); column <= 'Z'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet[colLetter + '2'] ? firstSheet[colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            for (let column = 'A'.charCodeAt(0); column <= 'Z'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet['A' + colLetter + '2'] ? firstSheet['A' + colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            for (let column = 'A'.charCodeAt(0); column <= 'Z'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet['B' + colLetter + '2'] ? firstSheet['B' + colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            for (let column = 'A'.charCodeAt(0); column <= 'Z'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet['C' + colLetter + '2'] ? firstSheet['C' + colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            for (let column = 'A'.charCodeAt(0); column <= 'Z'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet['D' + colLetter + '2'] ? firstSheet['D' + colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            for (let column = 'A'.charCodeAt(0); column <= 'Z'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet['E' + colLetter + '2'] ? firstSheet['E' + colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            for (let column = 'A'.charCodeAt(0); column <= 'E'.charCodeAt(0); column++) {
                const colLetter = String.fromCharCode(column);
                const cellValue = firstSheet['F' + colLetter + '2'] ? firstSheet['F' + colLetter + '2'].v : '';
                otherData.push(cellValue);
            }

            // // // Check for column FE2
            // const cellValueFE = firstSheet['FE2'] ? firstSheet['FE2'].v : '';
            // otherData.push(cellValueFE);

            console.log(otherData);  // Output the array to console for verification
            // const importedTags = ['Tag1', 'Tag2', 'Tag3']; // Replace this with your actual imported tags
            subtaskSelected(otherData);

        };

        reader.readAsArrayBuffer(file);
        console.log(subtask);

    };

    const onSubmit = (data) => {
        // You can now use 'dueDate' and 'subtaskDueDate' in your dispatch
        dispatch(
            addTasks({
                ...data,
                sub_task: subtask,
                subtaskStartDate: dateFormat(data.subtaskStartDate),
                subtaskDueDate: data.subtaskDueDate ? dateFormat(data.subtaskDueDate) : null,
                user_id: user.user_id,
                startDate: dateFormat(data.startDate),
                dueDate: data.dueDate ? dateFormat(data.dueDate) : null,
                project_id: currentProject.id,
            })
        );
        console.log(">>>>>>Add Task Form "+ new Date())
    };

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
                                        margin="normal"
                                        label={t("task_name")}
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        fullWidth
                                        variant='outlined'
                                        helperText={errors.title?.message}
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label={t("start_date")}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: "100%", mt: 1 }}
                                            onChange={(date) => {
                                                field.onChange(date.$d);
                                                calculateDueDate(date.$d);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} sx={{ width: "100%" }} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            label={t("due_date")}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: "100%", mt: 1 }}
                                            onChange={(date) => field.onChange(date)}
                                            renderInput={(params) => (
                                                <TextField {...params} sx={{ width: "100%" }} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label={t('user')}
                                helperText={errors.customer?.message}
                                error={!!errors.customer}
                                fullWidth
                                variant="outlined"
                                sx={{ width: '100%', mt: 2 }}
                                value={selectedCustomer.length ? selectedCustomer[0].id : ''}
                                onChange={handleCustomerChange}
                            >
                                {userList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="discription"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black', mt: 2, mb: 2 }}
                                        {...field}
                                        autoComplete="given-name"
                                        name="discription"
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        fullWidth
                                        id="discription"
                                        label={t("discription")}
                                        multiline
                                        rows={2}
                                        defaultValue=""
                                        error={errors.discription}
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                    />}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="sub_task"
                                control={control}
                                render={({ field }) =>
                                    <TagsInput
                                        {...field}
                                        sx={{ color: 'black' }}
                                        value={subtask}
                                        onChange={subtaskSelected}
                                        name="fruits"
                                        placeHolder={t("subtask")}
                                    />
                                }
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} >
                            <Controller
                                name="subtaskStartDate"
                                control={control}
                                render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            // minDate={new Date()}
                                            label={t('start_date')}
                                            inputFormat="DD/MM/YYYY"
                                            value={field.value}
                                            sx={{ width: '100%', mt: 2 }}
                                            onChange={(date) => field.onChange(date.$d)}
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />

                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} >
                            <Controller
                                name="subtaskDueDate"
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
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>

                        <Grid item xs={5} sm={5}>
                            <Controller
                                name="extend_days"
                                control={control}
                                label={t("extended_every_30_days")}
                                render={({ field }) =>
                                    <div className={'mt-2'}>
                                        <Checkbox  {...field} label={t("extended_every_30_days")} />
                                        <span>{t("extended_every_30_days")}</span>
                                    </div>
                                }
                            />

                        </Grid>

                        <Grid item xs={8} sm={8}>
                            <LoadingButton
                                variant="contained"
                                loading={status === 'loading'}
                                sx={{
                                    mt: 2, float: 'right',
                                    backgroundColor: 'var(--primary-color)',
                                    '&:hover': {
                                        backgroundColor: 'var(--secondary-color)',
                                        color: 'black',
                                    },
                                }}
                                onClick={() => document.getElementById('importExcelInput').click()}
                            >
                                {t('import task')}
                            </LoadingButton>
                            <input
                                type="file"
                                id="importExcelInput"
                                accept=".xlsx, .xls"
                                style={{ display: 'none' }}
                                onChange={(e) => importExcel(e.target.files[0])}
                            />
                        </Grid>
                        <Grid xs={4} sm={4} >
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={status === 'loading'}
                                sx={{
                                    mt: 3, float: 'right',
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