import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
import AddTaskPop from "../PopUp/Tasks/AddTaskPop";
import axios from "axios";
import html2pdf from "html2pdf.js";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
// import TaskMultiSelect from "../UseAble/TaskMultiSelect.jsx";
// import ModeEditIcon from "@mui/icons-material/ModeEdit.js";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline.js";
import TablePagination from "@mui/material/TablePagination";
// import {setCurrentProject, setCurrentTask, fetchTasks} from "../../Redux/taskReducer.js";
import { fetchResumeTasks } from "../../Redux/taskReducer.js";
// import EditTask from "../PopUp/Tasks/EditTask.jsx";
// import DeleteTask from "../PopUp/Tasks/DeleteTask.jsx";
// import AddSubTaskPop from "../PopUp/SubTasks/AddSubTaskPop.jsx";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp.js";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown.js";
import Collapse from "@mui/material/Collapse";
// import EditSubTaskPop from "../PopUp/SubTasks/EditSubTaskPop.jsx";
// import DeleteSubTaskPop from "../PopUp/SubTasks/DeleteSubTaskPop.jsx";
// import TaskStatus from "../PopUp/Tasks/TaskStatus.jsx";
// import SubTaskStatus from "../PopUp/SubTasks/SubTaskStatus.jsx";
// import SubTaskMultiSelect from "../UseAble/SubTaskMultiSelect.jsx";
// import MailOutlinedIcon from "@mui/icons-material/MailOutlined.js";
// import AddTaskEmailPopUp from "../PopUp/Tasks/Task Email/AddTaskEmailPopUp.jsx";
import Loader from "../Loader.jsx";
import { useEffect } from "react";
import Download from "@mui/icons-material/Download";

function createData(
  project_name,
  assign_user,
  project_status,
  project_startdate,
  project_enddate,
  tasks,
  id,
  project_description,
  progress
) {
  return {
    project_name,
    assign_user,
    project_status,
    project_startdate,
    project_enddate,
    tasks,
    id,
    project_description,
    progress,
  };
}

function Row(props) {
  const { row } = props;
  // const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  // const dispatch = useDispatch()
  // const { user } = useSelector(state => state.Auth)
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>({row.id})</TableCell>

        <TableCell sx={{ fontWeight: "bold", fontSize: 14 }} align="left">
          {row.project_name}
        </TableCell>

        <TableCell align="left">
          {row?.assign_user.map(function (item, i) {
            return <p className={"mb-0"}>{item?.assin_by?.name}</p>;
          })}
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: "normal", fontSize: 14 }}>
          {row.project_startdate}
        </TableCell>
        <TableCell sx={{ fontWeight: "normal", fontSize: 14 }} align="center">
          {row.project_enddate}
        </TableCell>
        <TableCell sx={{ fontWeight: "normal", fontSize: 14 }} align="center">
          {row.progress}%
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              p: 1,
              color: "white",
              borderRadius: 2,
              fontSize: 12,
              cursor: "pointer",
              backgroundColor:
                row.project_status === "completed"
                  ? "#20BF55"
                  : row.project_status === "new"
                  ? "var(--secondary-color)"
                  : row.project_status === "late"
                  ? "#CD500C"
                  : row.project_status === "pending"
                  ? "#D9BB41"
                  : "var(--primary-color)",
            }}
          >
            {t(row.project_status)}
          </Box>
        </TableCell>
      </TableRow>

      {/* <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingLeft: 0,
          }}
          colSpan={"100%"}
        >
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box>
              <TableHead>
                <TableRow>
                  <TableCell style={{ paddingRight: 40 }} sx={{ width: "5%" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ width: "25%" }}>{t("task")}</TableCell>
                  <TableCell sx={{ width: "20%" }}>{t("assignee")}</TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    {t("start_date")}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    {t("due_date")}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "5%" }}>
                    {t("progress")}
                  </TableCell>
                  <TableCell align="center" sx={{ width: "5%" }}>
                    {t("status")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row?.tasks?.map((task, taskIndex) => {
                  return (
                    <React.Fragment>
                      <TableRow key={`${task.title}-${taskIndex}`}>
                        <TableCell
                          sx={{ textAlign: "left" }}
                          component="th"
                          scope="row"
                        >
                          <div className={"round-circle"}></div>
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "left" }}
                          component="th"
                          scope="row"
                        >
                          {" "}
                          {task?.task_name?.title}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "left" }}
                          component="th"
                          scope="row"
                        >
                          {task.task_name?.assign_user?.map(function (item, i) {
                            return (
                              <p className={"mb-0"}>{item?.assin_by?.name}</p>
                            );
                          })}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "left" }}
                          component="th"
                          scope="row"
                        >
                          {task?.task_name?.start_date}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "left" }}
                          component="th"
                          scope="row"
                        >
                          {task?.task_name?.end_date}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {task?.task_name?.progress}%
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              p: 1,
                              color: "white",
                              borderRadius: 2,
                              fontSize: 12,
                              cursor: "pointer",
                              backgroundColor:
                                task?.task_name?.status === "completed"
                                  ? "#20BF55"
                                  : task?.task_name?.status === "new"
                                  ? "var(--secondary-color)"
                                  : task?.task_name?.status === "late"
                                  ? "#CD500C"
                                  : task?.task_name?.status === "pending"
                                  ? "#D9BB41"
                                  : "var(--primary-color)",
                            }}
                          >
                            {t(task?.task_name?.status)}
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingLeft: 0,
                          }}
                          colSpan={"100%"}
                        >
                          <Collapse in={true} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Table
                                size="small"
                                aria-label="purchases"
                                width={"100%"}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell
                                      style={{ paddingRight: 40 }}
                                      sx={{ width: "5%" }}
                                    >
                                      #
                                    </TableCell>
                                    <TableCell sx={{ width: "25%" }}>
                                      {t("subtask")}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      sx={{ width: "20%" }}
                                    >
                                      {t("assignee")}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ width: "20%" }}
                                    >
                                      {t("start_date")}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ width: "20%" }}
                                    >
                                      {t("due_date")}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ width: "5%" }}
                                    >
                                      {t("progress")}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={{ width: "5%" }}
                                    >
                                      {t("status")}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {task?.sub_tasks &&
                                    task?.sub_tasks.map((tasksRow, i) => (
                                      <TableRow key={tasksRow.id}>
                                        <TableCell component="th" scope="row">
                                          <div
                                            className={"round-ractangle"}
                                          ></div>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {tasksRow.sub_task_name?.title}
                                        </TableCell>
                                        <TableCell align="center">
                                          {tasksRow?.sub_task_name?.assign_user?.map(
                                            function (item, i) {
                                              return (
                                                <p className={"mb-0"}>
                                                  {item?.assin_by?.name}
                                                </p>
                                              );
                                            }
                                          )}
                                        </TableCell>
                                        <TableCell align="center">
                                          {tasksRow.sub_task_name?.start_date}
                                        </TableCell>
                                        <TableCell align="center">
                                          {tasksRow.sub_task_name?.end_date}
                                        </TableCell>
                                        <TableCell align="center">
                                          {tasksRow.sub_task_name?.progress}%
                                        </TableCell>
                                        <TableCell align="center">
                                          <Box
                                            sx={{
                                              p: 1,
                                              color: "white",
                                              borderRadius: 2,
                                              backgroundColor:
                                                tasksRow?.sub_task_name
                                                  ?.status === "completed"
                                                  ? "#20BF55"
                                                  : tasksRow?.sub_task_name
                                                      ?.status === "new"
                                                  ? "var(--secondary-color)"
                                                  : tasksRow?.sub_task_name
                                                      ?.status === "late"
                                                  ? "#CD500C"
                                                  : tasksRow?.sub_task_name
                                                      ?.status === "pending"
                                                  ? "#D9BB41"
                                                  : "var(--primary-color)",
                                            }}
                                          >
                                            {t(tasksRow?.sub_task_name?.status)}
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

// export default function TaskTable() {
//     const dispatch = useDispatch()
//     const [page, setPage] = React.useState(0);
//     // const { projectTasks } = useSelector(state => state.TaskReducer)
//     const { tasks } = useSelector(state => state.TaskReducer)
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [rows, setRows] = React.useState([]);
//     const { t } = useTranslation()
//     const contentRef = React.useRef('')
//     const ref = React.useRef(null)
//     const [loading, setLoading] = React.useState(true);

//     const { user } = useSelector(state => state.Auth)

//     function createData(project_name, assign_user, project_status, project_startdate, project_enddate, tasks, id, project_description, progress) {
//         return { project_name, assign_user, project_status, project_startdate, project_enddate, tasks, id, project_description, progress };
//     }

//     useEffect(() => {
//         // Fetch tasks when page changes or component mounts
//         // setLoading(true);
//        dispatch(fetchResumeTasks({ user_id: user.user_id, page: 0 }));
//       }, [dispatch]);

//     useEffect(() => {
//         if(tasks.data) {
//             let rowArr = tasks.data.map((item) => {
//                 return createData(item.project_name, item.assign_user, item.project_status, item.project_startdate, item.project_enddate, item.tasks, item.id, item.project_description, item.progress, item.tasks)
//             });
//             setRows(rowArr);
//             // setLoading(false);
//         }
//         console.log("tasks")
//         console.log(tasks)
//     }, [tasks]);

//     const handleDownloadPDF = () => {
//         const element = contentRef.current;
//         console.log(element);
//         if(element !== ''){
//             const options = {
//                 margin: [0, 0.5, 0, 0.5],
//                 filename: 'crm.pdf',
//                 image: { type: 'jpeg', quality: 0.98 },
//                 html2canvas: { scale: 2 },
//                 jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape', compressPDF: true },
//                 width: 842,
//                 height: 595
//             };
//             html2pdf().set(options).from(element).save();
//         } else{
//             console.log(contentRef);
//         }

//     };

//     const addTask = () => {
//         ref.current.click()
//     }

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     return (
//         <React.Fragment>
//             <Box id='scroll' sx={{ width: '100%', p: 3 }}>
//                 {contentRef !== '' && (
//                     <Button variant='contained'
//                     sx={{ display: `${tasks.length < 1 && 'none'}` }}
//                     endIcon={<DownloadIcon />}
//                     onClick={handleDownloadPDF}> PDF</Button>
//                 )}

//                     {/* {loading ? (
//         <Loader/>
//       ) : ( */}
//                 <TableContainer >

//                   <div ref={contentRef}>
//                       <Table aria-label="collapsible table" sx={{ maxHeight: '77vh' }}>
//                         <TableHead >
//                             <TableRow >
//                                 <TableCell sx={{ width: '5%' }}>#</TableCell>
//                                 <TableCell style={style.tableHeading} sx={{ width: '25%' }}>{t('Projects')}</TableCell>
//                                 <TableCell style={style.tableHeading} align="left" sx={{ width: '20%' }}>{t('assignee')}</TableCell>
//                                 <TableCell style={style.tableHeading} align="center" sx={{ width: '20%' }}>{t('start_date')}</TableCell>
//                                 <TableCell style={style.tableHeading} align="center" sx={{ width: '20%' }}>{t('due_date')}</TableCell>
//                                 <TableCell style={style.tableHeading} align="center" sx={{ width: '5%' }}>{t('progress')}</TableCell>
//                                 <TableCell style={style.tableHeading} align="center" sx={{ width: '5%' }}>{t('status')}</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {rows
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row) => {
//                                     return (
//                                         <Row key={row.id} row={row} />
//                                     );
//                                 })}
//                         </TableBody>
//                     </Table>
//                   </div>
//                     <Box sx={{ display: `${!tasks.length < 1 ? 'none' : "flex"}`, flexDirection: 'column', mt: 20, justifyContent: 'center', alignItems: 'center' }}>

//                         <Typography align='center'>
//                             {t('no_item_found')}
//                         </Typography>

//                     </Box>

//                     <AddTaskPop ref={ref} />

//                 </TableContainer>
//       {/* )} */}
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 20]}
//                     component="div"
//                     count={rows.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     sx={{ display: `${tasks.length < 1 ? 'none' : "block"}` }}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Box>
//         </React.Fragment>
//     );
// }

export default function TaskTable() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.TaskReducer);
  const { user } = useSelector((state) => state.Auth);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [disabledHandleDownloadXl, setDisabledHandleDownloadXl] = React.useState(false);

  const contentRef = React.useRef(null);
  const ref = React.useRef(null);

  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    console.log("page: "+ newPage)
    setPage(newPage);
  };


  useEffect(() => {
    // Fetch tasks when page or rowsPerPage changes
    setLoading(true);
    dispatch(fetchResumeTasks({ user_id: user.user_id, page, rowsPerPage }));

  }, [dispatch, user.user_id, page]);

  useEffect(() => {
    console.log( "Task: "+tasks );
    console.log( tasks );
    if (tasks && tasks.data && Array.isArray(tasks.data)) {
      const formattedRows = tasks.data.map((item) =>
        createData(
          item.project_name,
          item.assign_user,
          item.project_status,
          item.project_startdate,
          item.project_enddate,
          item.tasks,
          item.id,
          item.project_description,
          item.progress
        )
      );
      setRows(formattedRows);
      setTotalRecord(tasks.total);
      setLoading(false);
    }

  }, [tasks]);

  const handleDownloadXl = async () => {
    setDisabledHandleDownloadXl(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/api/resume/projects/xl/${user.user_id}/${page + 1}`,
        { responseType: 'blob' } 
      );
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      link.href = url;
      link.setAttribute('download', 'crm.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error downloading the file:', error);
    } finally {
      setDisabledHandleDownloadXl(false); 
    }
  };

  // const handleDownloadPDF = () => {
  //   const element = contentRef.current;
  //   if (element) {
  //     const options = {
  //       margin: [0, 0.5, 0, 0.5],
  //       filename: "crm.pdf",
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: {
  //         unit: "in",
  //         format: "letter",
  //         orientation: "landscape",
  //         compressPDF: true,
  //       },
  //       width: 842,
  //       height: 595,
  //     };
  //     html2pdf().set(options).from(element).save();
  //   }
  // };

  const addTask = () => {
    ref.current.click();
  };

  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Box id="scroll" sx={{ width: "100%", p: 3 }}>
        {rows.length > 0 && (
          <Button
            variant="contained"
            sx={{ display: "flex" }}
            endIcon={<DownloadIcon />}
            onClick={handleDownloadXl}
            disabled={disabledHandleDownloadXl}
          >
             {disabledHandleDownloadXl ? (
           <div style={{width:"100%",height:'1px',display:"flex",alignItems:'center',justifyContent:'center'}}>
           <CircularProgress size={24}/>
         </div>
        ) : (
            <div>
              EXCEL
            </div>
        )}
          </Button>
        )}

        {loading ? (
           <Loader/>
        ) : (
          <TableContainer>
            <div ref={contentRef}>
              <Table aria-label="collapsible table" sx={{ maxHeight: "77vh" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "5%" }}>#</TableCell>
                    <TableCell sx={{ width: "25%" }}>{t("Projects")}</TableCell>
                    <TableCell align="left" sx={{ width: "20%" }}>
                      {t("assignee")}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "20%" }}>
                      {t("start_date")}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "20%" }}>
                      {t("due_date")}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      {t("progress")}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      {t("status")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
            <Row key={row.id} row={row} page={page} />
          ))}
                  {/* {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <Row key={row.id} row={row} />
                    ))} */}
                </TableBody>
              </Table>
            </div>

            {!rows.length && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography align="center">{t("no_item_found")}</Typography>
              </Box>
            )}

            <AddTaskPop ref={ref} />
          </TableContainer>
        )}

        <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalRecord}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

        {/* <TablePagination
          rowsPerPageOptions={[1, 5, 10, 20]}
          component="div"
          count={tasks.total} // Ensure this is the total number of items
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Box>
    </React.Fragment>
  );
}

const style = {
  tableHeading: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subTableHeading: {
    // fontWeight: 'bold',
    fontSize: 14,
    color: "var(--primary-color)",
  },
  iconButton: {
    backgroundColor: "var(--primary-color)",
    color: "white",
    m: "1px",
    "&:hover": {
      backgroundColor: "var(--secondary-color)",
      color: "black",
    },
  },
};
