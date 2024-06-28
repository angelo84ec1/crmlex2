import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
// import AddIcon from '@mui/icons-material/Add'; import { TextField } from '@mui/material';
import html2pdf from 'html2pdf.js';
import DownloadIcon from '@mui/icons-material/Download';

import { useTranslation } from 'react-i18next';

export default function ChildTaskTable({tasks}) {
    const [page] = React.useState(0);
    const { subtaskTasks } = useSelector(state => state.TaskReducer)
    const [rowsPerPage] = React.useState(10);
    const [search,] = React.useState(subtaskTasks)
    const { t } = useTranslation()
    const contentRef = React.useRef(null)


console.log(tasks,'tasks')

    function createData(subtask_name, id, subtask_status, subtask_startdate, subtask_enddate, subtasks, user_id, subtask_description, progress, subtask_id) {
        return { subtask_name, id, subtask_status, subtask_startdate, subtask_enddate, subtasks, user_id, subtask_description, progress, subtask_id };
      }


    const rows =
        tasks.map((item) => {

            return createData(item.subtask_name, item.id, item.subtask_status, item.subtask_startdate, item.subtask_enddate, item.subtasks, item.user_id, item.subtask_description, item.progress, item.subtask_id)

        })





    return (
        <React.Fragment>



                {/*<TableContainer >*/}


                {/*    <Table stickyHeader aria-label="sticky table" ref={contentRef}*/}
                {/*        className='pdf'*/}
                {/*    >*/}
                {/*        <TableHead >*/}
                {/*            <TableRow >*/}
                {/*                <TableCell>#</TableCell>*/}
                {/*                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'left' }} >*/}
                {/*                    Artículo</TableCell>*/}
                {/*                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'center' }} >*/}
                {/*                    {t('assignee')}</TableCell>*/}
                {/*                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('startDate')}</TableCell>*/}
                {/*                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', width: '10rem' }} align="center" >{t('dueDate')}</TableCell>*/}
                {/*                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('progress')}</TableCell>*/}
                {/*                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center">{t('status')}</TableCell>*/}



                {/*            </TableRow>*/}
                {/*        </TableHead>*/}
                {/*        <TableBody>*/}
                {/*            {rows*/}
                {/*                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/}
                {/*                .map((row, index) => {*/}
                {/*                    return (*/}
                {/*                        <React.Fragment key={row.subtask_name}>*/}
                {/*                            /!* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> *!/*/}
                {/*                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>*/}

                {/*                                <TableCell sx={{ fontWeight: 'bold', width: '2rem' }}>*/}
                {/*                                    ({index + 1})*/}
                {/*                                </TableCell>*/}



                {/*                                <TableCell sx={{ fontWeight: 'bold', fontSize: 13 }} align="left">*/}

                {/*                                    {row.subtask_name}</TableCell>*/}

                {/*                                <TableCell sx={{ fontWeight: 'bold', fontSize: 13 }} align="center">*/}
                {/*                                    {*/}
                {/*                                        row.subtask_assign_user_id.map((customer, index) => {*/}
                {/*                                            return (*/}
                {/*                                                <Typography key={index} sx={{ fontSize: 14 }}>*/}
                {/*                                                    {customer.name}*/}
                {/*                                                </Typography>*/}
                {/*                                            );*/}
                {/*                                        })*/}
                {/*                                    }*/}

                {/*                                </TableCell>*/}

                {/*                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 12 }}>{row.subtask_startdate}</TableCell>*/}
                {/*                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }} align="center">{row.subtask_enddate}</TableCell>*/}
                {/*                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12 }} align="center">{row.progress == null ? 0 : row.progress}%</TableCell>*/}
                {/*                                <TableCell align="center">*/}
                {/*                                    <Box sx={{*/}
                {/*                                        p: "4px", color: 'white', borderRadius: 2, fontSize: 12, cursor: 'pointer',*/}
                {/*                                        backgroundColor: row.subtask_status === 'completed' ? '#20BF55' :*/}
                {/*                                            row.subtask_status === 'new' ? 'var(--secondary-color)' :*/}
                {/*                                                row.subtask_status === 'late' ? '#CD500C' :*/}
                {/*                                                    row.subtask_status === 'pending' ? '#D9BB41' : 'var(--primary-color)'*/}
                {/*                                    }}>*/}
                {/*                                        {t(row.subtask_status)}*/}
                {/*                                    </Box>*/}
                {/*                                </TableCell>*/}
                {/*                            </TableRow>*/}

                {/*                            {row.tasks && row.tasks.map((task, taskIndex) => {*/}
                {/*                                return (*/}
                {/*                                    <TableRow key={`${row.subtask_name}-${taskIndex}`} >*/}
                {/*                                        <TableCell colSpan={4} sx={{ p: 0 }}>*/}
                {/*                                            <TableRow >*/}
                {/*                                                <TableCell><div style={{ width: '.5rem', height: '.5rem', backgroundColor: 'var(--primary-color)', borderRadius: 50 }}></div></TableCell>*/}
                {/*                                                <TableCell sx={{ textAlign: 'left', width: '12rem' }} component="th" scope="row">{task.subtask_name}</TableCell>*/}

                {/*                                                <TableCell align="center" sx={{ width: '8rem' }}>{task.subtask_startdate}</TableCell>*/}
                {/*                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>To</TableCell>*/}
                {/*                                                <TableCell align="center" sx={{ width: '8rem' }}>{task.subtask_enddate}</TableCell>*/}
                {/*                                                <TableCell align="center" sx={{ width: '8rem' }}>{task.progress == null ? 0 : task.progress}%</TableCell>*/}

                {/*                                                <TableCell align="center" sx={{ width: '8rem' }}>*/}
                {/*                                                    <Box sx={{*/}
                {/*                                                        p: '3px',*/}
                {/*                                                        color: 'white',*/}
                {/*                                                        borderRadius: 2,*/}
                {/*                                                        backgroundColor: task.subtask_status === 'completed' ? '#20BF55' :*/}
                {/*                                                            task.subtask_status === 'new' ? 'var(--secondary-color)' :*/}
                {/*                                                            task.subtask_status === 'late' ? '#CD500C' :*/}
                {/*                                                                task.subtask_status === 'pending' ? '#D9BB41' : 'var(--primary-color)'*/}
                {/*                                                    }}>*/}
                {/*                                                        {t(task.subtask_status)}*/}
                {/*                                                    </Box>*/}
                {/*                                                </TableCell>*/}
                {/*                                            </TableRow>*/}
                {/*                                        </TableCell>*/}
                {/*                                    </TableRow>*/}
                {/*                                );*/}
                {/*                            })}*/}
                {/*                        </React.Fragment>*/}
                {/*                    );*/}
                {/*                })}*/}
                {/*        </TableBody>*/}




                {/*    </Table>*/}
                {/*    <Box sx={{ display: `${!search.length < 1 ? 'none' : "flex"}`, flexDirection: 'column', mt: 20, justifyContent: 'center', alignItems: 'center' }}>*/}

                {/*        <Typography align='center'>*/}
                {/*            {t('no_item_found')}*/}
                {/*        </Typography>*/}

                {/*    </Box>*/}
                {/*</TableContainer>*/}



        </React.Fragment>
    );
}

const style = {
    tableHeading: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subTableHeading: {
        // fontWeight: 'bold',
        fontSize: 14,
        color: 'var(--primary-color)'
    }, iconButton: {
        backgroundColor: 'var(--primary-color)', color: 'white',
        m: '1px',
        '&:hover': {
            backgroundColor: 'var(--secondary-color)',
            color: 'black',
        },
    }
}
