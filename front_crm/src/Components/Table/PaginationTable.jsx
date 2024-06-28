import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
// import AddIcon from '@mui/icons-material/Add'; import { TextField } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Img1 from '../../assets/images/Rectangle 17.png'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PopUp from '../PopUp/UserPopUp/PopUp';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import EditUser from '../PopUp/UserPopUp/EditUser';
import ViewUser from '../PopUp/UserPopUp/ViewUser';
import DeleteUser from '../PopUp/UserPopUp/DeleteUser';
import { setCurrentUser } from '../../Redux/userReducer';
export default function PaginationTable() {
    const [page, setPage] = React.useState(0);
    const { userList } = useSelector((state) => state.Users)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState(userList)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const ref = React.useRef(null)



    React.useEffect(() => {
        setSearch(userList)
    }, [userList])
    // console.log(userList)

    const addUser = () => {
        ref.current.click()
    }

    const editRef = React.useRef(null)
    const handleEdit = () => {
        editRef.current.click()
    }
    const deleteRef = React.useRef(null)
    const handleDelete = () => {
        deleteRef.current.click()
    }

    const viewRef = React.useRef(null)
    const handleView = () => {
        viewRef.current.click()
    }


    const handleSearch = (text) => {
        if (text) {
            const newData = userList.filter((item) => {
                const itemname = item.name ? item.name.toUpperCase() : '';
                const itemproject_status = item.project_status ? item.project_status.toUpperCase() : '';
                const itemrole = item.role ? item.role.toUpperCase() : '';
                // const itemuser_pic = item.user_pic ? item.user_pic.toUpperCase() : '';
                const searchText = text.toUpperCase();
                return (
                    itemproject_status.indexOf(searchText) > -1 ||
                    itemrole.indexOf(searchText) > -1 ||
                    // itemuser_pic.indexOf(searchText) > -1 ||
                    itemname.indexOf(searchText) > -1

                );
            });
            setSearch(newData);
            setPage(0)
        } else {
            setSearch(userList);
            setPage(0)
        }
    };


    //Creat data for row
    function createData(name, email, project_status, user_pic, role, id, phone,added_by) {
        return { name, email, project_status, user_pic, role, id, phone,added_by };
    }

console.log(search)

    const rows =
        search.map((item) => {

            return createData(item.name, item.email, item.project_status, item.user_pic, item.role, item.id, item.phone,item.added_by)

        })

    // console.log(orderListLoading)



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <React.Fragment>
            {/* {

                orderListLoading == 'succeeded' ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <CircularProgress />
                    </Box>


                    : */}
            <Box id='scroll' sx={{ width: '100%', p: 3 }}>

                <TableContainer >

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Button
                            variant='contained'
                            onClick={() => addUser()}
                        // sx={{ backgroundColor: 'var(--primary-color)', color: 'white', }}
                        >
                            {t('add_user')}
                        </Button>

                        <TextField type='text'
                            variant="outlined"
                            size='small'
                            style={{
                                padding: 5, marginLeft: 5,
                                borderRadius: 2, width: '20rem'
                            }}
                            placeholder='Search...'
                            onChange={(e) => handleSearch(e.target.value)} />


                    </Box>
                    {/* <Table stickyHeader aria-label="sticky table" sx={{ display: `${status === null ? 'none' : ''}`, marginTop: 5 }}> */}
                    <Table stickyHeader aria-label="sticky table" sx={{ marginTop: 1, display: `${search.length < 1 && 'none'}` }}>
                        <TableHead >
                            <TableRow >

                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'left' }} >
                                    {t('name')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('email')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center" >{t('phone')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center">{t('role')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black', }} align="center">{t('action')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center">
                                    {/* <IconButton color='primary'
                                            // onClick={() => handle}
                                            >
                                                <AddIcon />
                                            </IconButton> */}


                                </TableCell>

                                {/* <TableCell sx={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} align="center">Order</TableCell> */}



                            </TableRow>
                        </TableHead>
                        <TableBody

                        >
                            {

                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => {
                                        return (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >


                                                <TableCell align="left">
                                                    <img style={{ borderRadius: 50, marginRight: '1rem', height: '2rem', width: '2rem', objectFit: 'cover' }} src={row.user_pic?row.user_pic:Img1} alt="" />
                                                    {/* {row.user_pic} */}
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 12 }}>

                                                    {row.email}
                                                </TableCell>
                                                <TableCell align="center">{row.phone}</TableCell>
                                                <TableCell align="center" sx={{ color: `${row.role === "Administrador" ? "red" : 'black'}` }} >{row.role}</TableCell>
                                                {/* <TableCell align="center">{row.role}</TableCell> */}
                                                {/* <TableCell align="center">{row.id}</TableCell> */}
                                                <TableCell align="center" >

                                                    <IconButton sx={style.iconButton}
                                                        onClick={() => {
                                                            dispatch(setCurrentUser(row))
                                                            handleEdit()
                                                        }}
                                                    >
                                                        <CreateIcon />
                                                    </IconButton>
                                                    <IconButton sx={style.iconButton}
                                                        onClick={() => {
                                                            dispatch(setCurrentUser(row))

                                                            handleDelete()
                                                        }}
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                    <IconButton sx={style.iconButton}
                                                        onClick={() => {
                                                            dispatch(setCurrentUser(row))
                                                            handleView()
                                                        }}
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                    {/* <IconButton sx={style.iconButton}
                                                            // onClick={() => handle}
                                                            >
                                                                <DescriptionIcon />
                                                            </IconButton> */}

                                                </TableCell>




                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                    <PopUp ref={ref} />
                    <Box sx={{ display: `${!search.length < 1 ? 'none' : "flex"}`, flexDirection: 'column', mt: 20, justifyContent: 'center', alignItems: 'center' }}>

                        <Typography align='center'>
                            No Item Found
                        </Typography>
                        {/* <Button
                                onClick={() => navigate('/order')}
                                variant='contained' sx={{ width: '10rem', mt: 3 }}>
                                Add New Book
                            </Button> */}
                    </Box>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    sx={{ display: `${search.length < 1 ? 'none' : "block"}` }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <EditUser ref={editRef} />
                <ViewUser ref={viewRef} />
                <DeleteUser ref={deleteRef} />

            </Box>
            {/* } */}
        </React.Fragment>
    );
}

const style = {
    iconButton: {
        backgroundColor: 'var(--primary-color)', color: 'white',
        m: '1.5px',
        '&:hover': {
            backgroundColor: 'var(--secondary-color)',
            // color: 'black',
        },
    }
}