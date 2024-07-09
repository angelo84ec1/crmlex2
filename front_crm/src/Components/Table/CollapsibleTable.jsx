import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import AddTaskPop from "../PopUp/Tasks/AddTaskPop";
import { useSelector, useDispatch } from "react-redux";
import AddSubTaskPop from "../PopUp/SubTasks/AddSubTaskPop";
import { setCurrentTask } from "../../Redux/taskReducer";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditTaskPop from "../PopUp/Tasks/EditTask";
import DeleteTaskPop from "../PopUp/Tasks/DeleteTask";
import EditSubTaskPop from "../PopUp/SubTasks/EditSubTaskPop";
import DeleteSubTaskPop from "../PopUp/SubTasks/DeleteSubTaskPop";
import TaskStatus from "../PopUp/Tasks/TaskStatus";
import SubTaskStatus from "../PopUp/SubTasks/SubTaskStatus";
import MultiSelect from "../UseAble/MultiSelect";
import { Typography } from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import AddEmailPopUp from "../PopUp/SubTasks/AddEmailPopUp";
import ChildTable from "./ChildTable";
import EditProjectPop from "../PopUp/Project/EditProject";
import ProjectStatus from "../PopUp/Project/ProjectStatus";
import AddProjectPop from "../PopUp/Project/AddProjectPop";
import DeleteProject from "../PopUp/Project/DeleteProject";
import { setCurrentProject, fetchTasks } from "../../Redux/taskReducer";

import { useEffect } from "react";

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
  console.log(props, "props props propsprops props props propsprops props");
  const { row, page } = props;
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);

  const refSub = React.useRef(null);
  const addSubTask = () => {
    refSub.current.click();
  };

  // --------------------------------------------------------EDIT TASK REF-------------------------------------
  const editTaskRef = React.useRef(null);
  const editTask = () => {
    editTaskRef.current.click();
  };
  // DELETE TASK REF
  const deleteTaskRef = React.useRef(null);
  const deleteTask = () => {
    deleteTaskRef.current.click();
  };
  //EDIT SUBTASK
  const editSubTaskRef = React.useRef(null);
  const editSubTask = () => {
    editSubTaskRef.current.click();
  };
  // DELETE SUBTASK REF
  const deleteSubTaskRef = React.useRef(null);
  const deleteSubTask = () => {
    deleteSubTaskRef.current.click();
  };
  // TASK STATUS REF
  const taskStatus = React.useRef(null);
  const editTaskStatus = () => {
    taskStatus.current.click();
  };
  // SUB TASK STATUS REF
  const subtaskStatus = React.useRef(null);
  const editSubTaskStatus = () => {
    subtaskStatus.current.click();
  };
  // EMAIL POPUP REF
  const emailPopUp = React.useRef(null);
  const EmailPopUp = () => {
    emailPopUp.current.click();
  };

  return (
    <React.Fragment>
      {/* --------------------------------------TABLE ROWS------------------------------------ */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              dispatch(setCurrentProject(row));
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.project_name}
        </TableCell>
        <TableCell align="center">
          <MultiSelect
            options={row.assign_user?.map((item) => ({
              name: item?.assin_by?.name,
              id: item.assign_user_id,
            }))}
            currentTask={row}
          />
        </TableCell>
        <TableCell
          align="center"
          onClick={() => {
            // if (user.role !== 'Cliente' && user.role !== 'Supervisor'&&user.role !== 'Assistant') {
            if (user.role === "Administrador") {
              dispatch(setCurrentTask(row));
              editTaskStatus();
            }
          }}
        >
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
                  ? "#8E2DE2"
                  : row.project_status === "late"
                  ? "#CD500C"
                  : row.project_status === "pending"
                  ? "#D9BB41"
                  : "#4A00E0",
            }}
          >
            {t(row.project_status)}
          </Box>
        </TableCell>
        <TableCell align="center">{row.project_startdate}</TableCell>
        <TableCell align="center">{row.project_enddate}</TableCell>
        {/* TASK  ACTIONS */}
        <TableCell align="center">
          <IconButton
            // sx={{ ...style.iconButton, display: user.role === 'Cliente'||user.role === 'Assistant' && 'none' }}
            sx={{
              ...style.iconButton,
              display:
                user.role === "Administrador" || user.role === "Supervisor"
                  ? ""
                  : "none",
            }}
            onClick={() => {
              dispatch(setCurrentTask(row));
              editTask();
            }}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            sx={{
              ...style.iconButton,
              display: user.role !== "Administrador" && "none",
            }}
            // sx={{ ...style.iconButton, display: user.role === 'Assistant' && 'none' || user.role === 'Supervisor' && 'none' || user.role === 'Cliente' && 'none' }}
            onClick={() => {
              dispatch(setCurrentTask(row));
              deleteTask();
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>

        {/* =----------------------REFFERENCE COMPONENTS------------------------- */}
        <EditProjectPop ref={editTaskRef} props={page} />
        <DeleteProject ref={deleteTaskRef} />
        <ProjectStatus ref={taskStatus} />
      </TableRow>

      {/* -----------------------SUB TABLE HEADER---------------------------------------- */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <ChildTable tasks={row?.tasks} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const { tasks, projectTasks } = useSelector((state) => state.TaskReducer);
  const { user } = useSelector((state) => state.Auth);
  const [rows, setRows] = React.useState([]);
  const [totalRecord, setTotalRecord] = React.useState(0); // Initialize totalRecord
  const [page, setPage] = React.useState(0); // Page state starts from 0 for TablePagination
  const rowsPerPage = 5;

  const addTask = () => {
    ref.current.click();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state when page changes
  };

  useEffect(() => {
    // Fetch tasks when page changes or component mounts
    dispatch(fetchTasks({ user_id: user.user_id, page: page }));
  }, [dispatch, user.user_id, page]);

  useEffect(() => {
    // Update rows and totalRecord when tasks data changes
    if (tasks && tasks.data && Array.isArray(tasks.data)) {
      // console.log('After Function Calling');
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
    }
  }, [tasks]);

  return (
    <TableContainer className="table-style">
      {/* Table Headers and Body */}
      <Table aria-label="collapsible table" sx={{ maxHeight: "77vh" }}>
        {/* Table Headers */}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={style.tableHeading}>{t("Projects")}</TableCell>
            <TableCell style={style.tableHeading} align="left">
              {t("assignee")}
            </TableCell>
            <TableCell
              style={style.tableHeading}
              align="center"
              sx={{ width: "3rem" }}
            >
              {t("status")}
            </TableCell>
            <TableCell
              style={style.tableHeading}
              align="center"
              sx={{ width: "10rem" }}
            >
              {t("start_date")}
            </TableCell>
            <TableCell
              style={style.tableHeading}
              align="center"
              sx={{ width: "12rem" }}
            >
              {t("due_date")}
            </TableCell>
            <TableCell style={style.tableHeading} align="center">
              <IconButton
                sx={{
                  ...style.iconButton,
                  display:
                    user.role === "Cliente" || user.role === "Assistant"
                      ? "none"
                      : "",
                }}
                onClick={addTask}
              >
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} page={page} />
          ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalRecord}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />

      {/* Empty State */}
      <Box
        sx={{
          width: "100%",
          mt: "10rem",
          display: `${!projectTasks.length < 1 && "none"}`,
        }}
      >
        <Typography color={"primary"} align="center">
          {t("empty")}
        </Typography>
      </Box>

      {/* Add Project Popup */}
      <AddProjectPop ref={ref} props={page} />
    </TableContainer>
  );
}

const style = {
  tableHeading: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subTableHeading: {
    fontWeight: "bold",
    fontSize: 14,
    color: "var(--primary-color)",
  },
  iconButton: {
    backgroundColor: "var(--primary-color)",
    color: "white",
    m: "1px",
    "&:hover": {
      backgroundColor: "var(--secondary-color)",
      // color: 'black',
    },
  },
};
