import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useTranslation } from 'react-i18next';
import AddTaskPop from '../PopUp/Tasks/AddTaskPop';
import { useSelector } from 'react-redux';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'project_name',
    numeric: false,
    disablePadding: false,
    label: 'Artículo',
  },
  {
    id: 'project_startdate',
    numeric: true,
    disablePadding: false,
    label: 'Fecha Inicio',
  },
  {
    id: 'project_enddate',
    numeric: true,
    disablePadding: false,
    label: 'Fecha Final',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Estado',
  },
  // {
  //   id: 'carbs',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Carbs (g)',
  // },
  // {
  //   id: 'protein',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Protein (g)',
  // },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            sx={{ fontWeight: 'bold', fontSize: 15 }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'columnIdToHideSortIcon' ? (
              <Typography variant="subtitle1">{headCell.label}</Typography>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                hideSortIcon={true}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

  );
}

EnhancedTableHead.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function SortDataTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { t } = useTranslation()
  const { tasks} = useSelector((state) => state.TaskReducer)

  const ref = React.useRef(null)
  const addUser = () => {
    ref.current.click()
  }


  function createData(project_name, project_assign_user_id, project_status, project_startdate, project_enddate, total, order_items) {
    return { project_name, project_assign_user_id, project_status, project_startdate, project_enddate, total, order_items };
}


const rows =
    tasks.map((item) => {

        return createData(item.project_name, item.project_assign_user_id, item.project_status, item.project_startdate, item.project_enddate, item.total, item.order_items)

    })



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%', p: 4,borderRadius:5,backgroundColor:'white' }}>
      {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
        <TableContainer >
          {/* <Button
            onClick={() => addUser()}
            sx={{ backgroundColor: 'var(--primary-color)', color: 'white', m: 2 }}>
            {t('add_user')}
          </Button> */}
          <Table
            sx={{ minWidth: 750 }}
          // aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>

              {visibleRows.map((row, index) => {
                {/* const labelId = `enhanced-table-checkbox-${index}`; */ }

                return (
                  <TableRow
                    hover

                    key={row.name}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* <TableCell

                    >

                    </TableCell> */}
                    <TableCell
                      align="center"
                      component="th"
                      // id={labelId}
                      scope="row"
                    // padding="none"
                    >
                      {row.project_name}
                    </TableCell>
                    <TableCell align="center">{row.project_startdate}</TableCell>
                    <TableCell align="center">{row.project_enddate}</TableCell>
                    <TableCell align="center">{row.project_status}</TableCell>
                    {/* <TableCell align="center">{row.carbs}</TableCell> */}
                    {/* <TableCell align="center">{row.protein}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      {/* </Paper> */}
      <AddTaskPop ref={ref} />
    </Box>
  );
}