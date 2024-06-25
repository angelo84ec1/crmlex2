import * as React from 'react';
import { useEffect } from "react";
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Img from '../../assets/images/Rectangle 17.png'
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddContactPop from '../../Components/PopUp/ContactPopup/AddContact';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import ViewContact from '../../Components/PopUp/ContactPopup/ViewContact';
import DeleteContact from '../../Components/PopUp/ContactPopup/DeleteContact';
import EditContact from '../../Components/PopUp/ContactPopup/EditContact';
import { setCurrentCustomer } from '../../Redux/customerReducer';
export default function Contacts() {
    const [page, setPage] = React.useState(0);
    const { userList } = useSelector((state) => state.Users)
    
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState(userList)
    const { t } = useTranslation()
    const [isupdate, setisupdate] = React.useState(0);
    const [rows, setRows] = React.useState([]);

    
    const ref = React.useRef(null)
    const dispatch = useDispatch()
    const addContact = () => {
        ref.current.click()
    }

    React.useEffect(() => {
        setSearch(userList)
    }, [userList])

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
                const itememail = item.email ? item.email.toUpperCase() : '';
                const itemphone = item.phone ? item.phone.toUpperCase() : '';
                const itemcustomer_forecast = item.itemcustomer_forecast ? item.customer_forecast.toUpperCase() : '';
                const itemcompany_name = item.company_name ? item.company_name.toUpperCase() : '';
                const searchText = text.toUpperCase();
                return (
                    itemcustomer_forecast.indexOf(searchText) > -1 ||
                    itememail.indexOf(searchText) > -1 ||
                    itemphone.indexOf(searchText) > -1 ||
                    itemcompany_name.indexOf(searchText) > -1 ||
                    itemname.indexOf(searchText) > -1

                );
            });
            setSearch(newData);
            setPage(0)
        } else {
            setSearch(userList.filter(customer=>customer.role!="Digitador"));
            setPage(0)
            // console.log(search)
        }
    };


    //Creat data for row
    function createData(name, email, phone, customer_forecast, user_pic, company_name, recent_activity, id, user_id) {
        return {
            name,
            email,
            phone,
            customer_forecast,
            user_pic,
            company_name,
            recent_activity, id, user_id
        };
    }
   // let rows =[]

    useEffect(() => {
        console.log(search, 'search search')
  
        let list = search.filter(item=>item.role!="Digitador").map((item) => {

            return createData(item.name, item.email, item.phone, item.customer_forecast, item.user_pic, item.company_name, item.recent_activity, item.id, item.user_id)

        })
        setRows(list)
        
    }, [search]);




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <React.Fragment >

        {/* <Typography sx={{p:2,fontWeight:'bold',fontSize:24}}  >{t('contacts')}</Typography> */}
            <Box id='scroll' sx={{ width: '100%', p: 2 }}>

                <TableContainer sx={{  width: '100%',backgroundColor:'white',p:2,borderRadius:5,height:'82vh' }}>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            onClick={() => addContact()} variant='contained'>
                            {t('add_contact')}
                        </Button>

                        <TextField type='text'
                            variant="outlined"
                            size='small'
                            style={{
                                padding: 5, marginLeft: 5,
                                borderRadius: 2, width: '20rem'
                            }}
                            placeholder='Buscar...'
                            onChange={(e) => handleSearch(e.target.value)} />

                    </Box>
                    {/* <Table stickyHeader aria-label="sticky table" sx={{ display: `${status === null ? 'none' : ''}`, marginTop: 5 }}> */}
                    <Table stickyHeader aria-label="sticky table" sx={{ marginTop: 2, display: `${search.length < 1 && 'none'}` }}>
                 
                        <TableHead >
                            <TableRow >

                                <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black', textAlign: 'left' }} >
                                    {t('name')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black' }} align="center" >{t('email')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black' }} align="center" >{t('phone')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black' }} align="center">{t('company_name')}</TableCell>
                                {/* <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black', }} align="center">{t('customer_foreCast')}</TableCell> */}
                                {/* <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black' }} align="center">
                                    {t('recent_activity')}
                                </TableCell> */}
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black', }} align="center">{t('Acción')}</TableCell>

                                {/* <TableCell sx={{ fontWeight: 'bold', fontSize: 14, color: 'black' }} align="center">Order</TableCell> */}



                            </TableRow>
                        </TableHead>
                        <TableBody

                        >
                            {

rows.length > 0 ? 

rows
.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
.map((row, i) => {
    return (
        <TableRow
            key={i}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >


            <TableCell align="left" sx={{ width: '12rem' }} >
                {/* <img style={{ borderRadius: 50, marginRight: '1rem', height: '2rem', width: '2rem', objectFit: 'contain' }} src={row.user_pic} alt="" /> */}
                <img style={{ borderRadius: 50, marginRight: '1rem', height: '2rem', width: '2rem', objectFit: 'contain' }} src={row.user_pic?row.user_pic:Img} alt="Img" />

                {row.name}
            </TableCell>

            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.phone}</TableCell>
            <TableCell align="center">{row.company_name}</TableCell>
            {/* <TableCell align="center">{row.customer_forrcast}</TableCell> */}
            {/* <TableCell align="center">{row.recent_activity}</TableCell> */}
            <TableCell align="center" sx={{ display: 'flex' }}>

                {/* <IconButton sx={style.iconButton}
                    onClick={() => {
                        dispatch(setCurrentCustomer(row))
                        handleEdit()
                    }}
                >
                    <CreateIcon />
                </IconButton> */}
                <IconButton sx={style.iconButton}
                    onClick={() => {
                        dispatch(setCurrentCustomer(row))
                        handleDelete()
                    }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
                <IconButton sx={style.iconButton}
                    onClick={() => {
                        dispatch(setCurrentCustomer(row))
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
})

: ''

                         }
                        </TableBody>
                    </Table>
                  
                    <Box sx={{ display: `${!search.length < 1 ? 'none' : "flex"}`, flexDirection: 'column', mt: 20, justifyContent: 'center', alignItems: 'center' }}>

                        <Typography align='center'>
                        {t('no_item_found')}
                        </Typography>
                        {/* <Button
                                onClick={() => navigate('/order')}
                                variant='contained' sx={{ width: '10rem', mt: 3 }}>
                                Add New Book
                            </Button> */}
                        <AddContactPop ref={ref} />
                    </Box>


                    <ViewContact ref={viewRef} />
                    <DeleteContact ref={deleteRef} />
                    <EditContact ref={editRef} />

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
            </Box>
        </React.Fragment>
    );
}

const style={
    iconButton: {
        backgroundColor: 'var(--primary-color)', color: 'white', 
        m: '1.5px',
        '&:hover': {
          backgroundColor: 'var(--secondary-color)',
        //   color: 'black',
        },
      }
}