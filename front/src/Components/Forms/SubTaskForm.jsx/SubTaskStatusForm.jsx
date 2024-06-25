import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Grid } from "@mui/material";
// import swal from 'sweetalert'
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { editSubTaskStatus } from "../../../Redux/taskReducer";
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


export default function SubTaskStatusForm() {

    const theme = useTheme()
    const { user } = useSelector(state => state.Auth)

    const { status, currentTask } = useSelector(state => state.TaskReducer)
    const dispatch = useDispatch()
    const [subtask_status, setSubtask_status] = React.useState(currentTask.status || "");
    const { t } = useTranslation()


    //validation Schema
    const schema = yup.object({
        subtask_status: yup.string().required(`${t("required")}`),

    }).required();

    const handleRoleChange = (event) => {
        setSubtask_status(event.target.value);
    };



    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subtask_status: currentTask.status
        }
    });

    //LOGIN USER USING AUTH CONTEXT
    const onSubmit = data => {
        dispatch(editSubTaskStatus({ ...data, user_id: user.user_id, id:currentTask.id, subtask_status: subtask_status }))
    }
   console.log(currentTask.status,'currentTask')
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
            label: t('completed'),
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


    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmit)} >

                <Box sx={{
                    display: 'flex', flexDirection: 'column', margin: 'auto',
                    p: 1
                }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="subtask_status"
                                control={control}
                                defaultValue={subtask_status}
                                rules={{ required: `${t("status_required")}` }}
                                onChange={([selected]) => selected} // update the form data with the selected value
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="outlined-select-currency"
                                        select
                                        label={t("status")}
                                        value={subtask_status}
                                        onChange={handleRoleChange}
                                        helperText={errors.subtask_status?.message}
                                        error={!!errors.subtask_status}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        <MenuItem value="" disabled>
                                            {t("select_status")}
                                        </MenuItem>
                                        {taskStatus.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                // style={{
                                                //     color:
                                                //         option.value === 'completed' ? '#20BF55' :
                                                //             option.value === 'new' ? 'var(--secondary-color)' :
                                                //                 option.value === 'pending' ? '#CD500C' : '#D9BB41',
                                                // }}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>





                    </Grid>

                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={status === 'loading'}
                        sx={{
                            mt: 4,
                            backgroundColor: 'var(--primary-color)'
                            ,
                            '&:hover': {
                                backgroundColor: 'var(--secondary-color)',
                                color: 'black',
                            },

                        }}
                    //  loading={true}
                    >
                        {t('edit_status')}
                    </LoadingButton>

                </Box>




            </form>


        </ThemeProvider>

    );
}
