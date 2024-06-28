import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from "@mui/material";
// import swal from 'sweetalert'
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { addMail } from "../../../Redux/taskReducer";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Mail from "../../MailBox/Mail";
import CircularProgress from '@mui/material/CircularProgress';

import { sendMail } from "../../../Redux/taskReducer";
import axios from "axios";
import { resetTask } from "../../../Redux/taskReducer";
import swal from 'sweetalert';
import Loader from "../../Loader";


export default function AddSubTaskForm() {


    const theme = useTheme()
    // const { user } = useSelector(state => state.Auth)
    const { mailStatus, currentTask, mailResponse } = useSelector(state => state.TaskReducer)
    const [mails, setMails] = React.useState([])
    const { userList } = useSelector(state => state.Users)

    const [upload_file, setUpload_file] = React.useState('')
    const [data, setData] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const boxRef = React.useRef(null);
    React.useEffect(() => {
        scrollToBottom();
    }, [mails]);

    const scrollToBottom = () => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    };
    //   ----------FETCH MAIL RESPONSES-----------------
    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/getsubtaskhistory/${currentTask.sub_task_id}`);
            setMails(response.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    };
    React.useEffect(() => {
        fetchData()
    }, [])

    const defaultValues = {
        assign_user_id: [],
        description: "",
        subtask_status: '',
    };

// -----------------VALIDATON SCHEMA------------------------
    //validation Schema
    const schema = yup.object().shape({
        assign_user_id: yup
            .array()
            .test('atLeastOneItem', 'Seleccione al menos un valor debe ser seleccionado', (value) => {
                return value && value.length > 0;
            }),
        description: yup.string().required(t('description_required')),
        subtask_status: yup.string().required(`${t("required")}`),

    });


// ---------------------------FORM CONTROLAR--------------------------------

    const { control, reset, handleSubmit, formState, setValue, form } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    });


    const { customers } = useSelector((state) => state.Customer);
    const { user } = useSelector((state) => state.Auth);
    // const {  currentTask } = useSelector(state => state.TaskReducer)
    const selectedCustomerIds = React.useRef([]);

    const handleSelectionChange = (event, value) => {
        const assign_user_id = [];
        const selectedIds = [];

        value.forEach((item) => {
            if (!selectedIds.includes(item.id)) {
                assign_user_id.push({ id: item.id, name: item.name });
                selectedIds.push(item.id);
            }
        });

        selectedCustomerIds.current = selectedIds; // Update selectedCustomerIds.current
        setValue("assign_user_id", assign_user_id);
    };
    const isCustomerSelected = (id) => selectedCustomerIds.current.includes(id);

    const taskStatus = [
        {
            value: 'pending',
            label: t('pending'),
        },
        {
            value: 'active',
            label: t('active'),
        },
        {
            value: 'completed',
            label: t('complete'),
        },
        {
            value: 'new',
            label: t('new'),
        },
        {
            value: 'late',
            label: t('late'),
        },

    ];

    const handleImageUpload = (event) => {
        setUpload_file(event.target.files[0])
    };

    const date = new Date();
    date.setHours(date.getHours() - 5);
    const formattedDate = date.toISOString().replace('T', ' ').slice(0, 19);

    const onSubmit = data => {
        // console.log({...data, user_id: currentTask.user_id, id: currentTask.id,user_list:data.assign_user_id })
        setData({ ...data, user_id: currentTask.user_id, id: currentTask.id,user_list:data.assign_user_id  })

        const formData = new FormData();
        formData.append('subtask_id', currentTask.sub_task_id);
        formData.append('task_id', currentTask.task_id);
        formData.append('project_id', currentTask.project_id);
        formData.append('description', data.description);
        formData.append('status', data.subtask_status);
        formData.append('user_id', user.user_id);
        formData.append('upload_file', upload_file);
        formData.append('assign_user_id', JSON.stringify(data.assign_user_id));
        dispatch(sendMail(formData))
        
        form.reset(defaultValues)
    }

    React.useEffect(() => {
        if (mailResponse.message) {
            // swal(
            //     {
            //         title: `Exito`,
            //         text: `Mail Send`,
            //         icon: 'success',
            //         button: false,
            //         timer: 1000
            //     }
            // )

            dispatch(resetTask())
            setMails(mails.concat({...data,add_datetime:formattedDate}))
        }
    }, [mailResponse])


    return (
        <ThemeProvider theme={theme}>


            <Typography>
                {currentTask.subtask_name}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} >

                <Box sx={{
                    display: 'flex', flexDirection: 'column', margin: 'auto',
                    p: 1
                }}>
                    <Grid container spacing={1}>


                        <Grid item xs={12} sm={12} md={12}>
                            <Controller
                                name="assign_user_id"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete

                                        {...field}
                                        multiple
                                        options={userList}
                                        getOptionLabel={(option) => option.name}

                                        // disableCloseOnSelect
                                        value={field.value}
                                        onChange={(event, value) => {
                                            handleSelectionChange(event, value);
                                        }}
                                        renderInput={(data) => (
                                            <TextField
                                                {...data}
                                                variant="standard"
                                                placeholder="Asignado"
                                                error={!!formState.errors.assign_user_id}
                                                helperText={formState.errors.assign_user_id?.message}
                                            />
                                        )}
                                        renderOption={(props, option, { selected }) => (
                                            <MenuItem
                                                {...props}
                                                key={option.id}
                                                value={option}
                                                // onChange={() => console.log('helo')}
                                                sx={{
                                                    justifyContent: "space-between",
                                                    backgroundColor: selected ? "#e0e0e0" : "inherit",
                                                }}
                                            >
                                                {option.name}
                                                {`(${option.role})`}
                                                {isCustomerSelected(option.id) ? <CheckIcon color="info" /> : null}
                                            </MenuItem>
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                            <Button color="primary" component="label">
                                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                                <AttachFileOutlinedIcon />
                                {t('attach_file')}
                            </Button>

                            {formState.errors.file && <p style={{ fontSize: 12, color: 'red' }}>{formState.errors.file.message}</p>}
                        </Grid>

                        <Grid item xs={12} sm={3} md={3}>
                            <Controller
                                name="subtask_status"
                                control={control}
                                rules={{ required: `${t('status_required')}` }}
                                defaultValue={currentTask.subtask_status}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-select-currency"
                                        select
                                        label={t('status')}
                                        value={field.value} // Set the value to the field value
                                        onChange={field.onChange} // Update the field value
                                        helperText={formState.errors.subtask_status?.message}
                                        error={!!formState.errors.subtask_status}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        <MenuItem value="" disabled>
                                            {t('select_status')}
                                        </MenuItem>
                                        {taskStatus.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>




                        <Grid item xs={12} sm={12} md={12}>
                            <Box
                                ref={boxRef}
                                sx={{
                                    p: 1,
                                    height: "12rem",
                                    border: "1px solid #E2E2E2",
                                    borderRadius: 1,
                                    overflow: "scroll",
                                    scrollBehavior: "smooth",
                                    overflowX: "hidden",
                                }}
                            >
                                {loading ? (
                                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                        <CircularProgress />
                                    </div>
                                ) : (
                                    <>
                                        {mails.length<1?
                                        <p style={{textAlign:'center',marginTop:'4rem',color:'var(--background-color)'}}>{t('empty')}</p>
                                        : mails.map((mail) => {
                                            return <Mail key={mail.subtask_name} mail={mail} />
                                        })}
                                    </>
                                )}
                            </Box>
                        </Grid>



                        <Grid item xs={12} sm={12} md={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) =>
                                    <TextField
                                        sx={{ color: 'black' }}
                                        {...field}
                                        autoComplete="given-name"
                                        inputProps={{
                                            style: { textTransform: 'capitalize' },
                                        }}
                                        // name="description"
                                        // required
                                        fullWidth
                                        id="description"
                                        label={t("description")}
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                        error={formState.errors.description}
                                        helperText={formState.errors.description?.message}
                                    />}
                            />
                        </Grid>


                    </Grid>
                </Box>



                <Box sx={{ p: 1, width: '100%', display: 'flex', justifyContent: 'end' }}>

                    <LoadingButton
                        size="small"
                        type="submit"
                        //   onClick={handleClick}
                        endIcon={<SendIcon />}
                        loading={mailStatus === 'loading'}
                        // disabled={upload_file === ''}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>{t('send')}</span>
                    </LoadingButton>
                </Box>



            </form>


        </ThemeProvider>

    );
}
