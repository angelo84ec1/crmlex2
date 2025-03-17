import React, { useEffect } from "react";
import { GanttOriginal } from "react-gantt-chart";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./style.css";

const NewGantt = () => {
  const { ganttChart } = useSelector((state) => state.Dashboard);
  const parentTasks = ganttChart.filter((task) => task.project_type === "task");
  const [viewMode, setViewMode] = React.useState("Day");
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState(ganttChart?.slice(0, 7));
  const [expandedTasks, setExpandedTasks] = React.useState({});
  const [expandedSubTasks, setExpandedSubTasks] = React.useState({});
  const [showSubTasks, setShowSubTasks] = React.useState(false);

  console.log(parentTasks);
  const handleChange = (event) => {
    setViewMode(event.target.value);
  };

  const handleNextPageClick = () => {
    setPage(page + 7);
  };

  const handleBackPageClick = () => {
    setPage(page - 7);
  };

  const handleTaskClick = (selectedTask) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [selectedTask.id]: !prev[selectedTask.id],
    }));
  };

  const handleSubTaskClick = (selectedSubTask) => {
    setExpandedSubTasks((prev) => ({
      ...prev,
      [selectedSubTask.id]: !prev[selectedSubTask.id],
    }));
  };

  useEffect(() => {
    const parentTasks = ganttChart.filter(
      (task) => task.project_type === "task"
    );
    const paginatedTasks = parentTasks.slice(page, page + 7);

    const updatedRows = paginatedTasks.reduce((acc, task) => {
      const isTaskExpanded = expandedTasks[task.id] || false;
      const Tasks = ganttChart.filter(
        (child) =>
          child.parent_id === task.id && child.project_type === "sub_task"
      );
      console.log("okay");
      const divFrom = document.querySelector(
        'div[style*="display: table-cell;"][style*="vertical-align: middle;"][style*="overflow: hidden;"][style*="text-overflow: ellipsis;"][style*="min-width: 150px;"][style*="max-width: 150px;"]'
      );
    
      if (divFrom) {
         divFrom.style.overflow = "";
         const isFirefox = typeof InstallTrigger !== 'undefined';
         if (isFirefox) {
          divFrom.style.display = "inline-block";
         }
        divFrom.style.overflow = "auto";
        divFrom.style.textOverflow = "clip";
        divFrom.style.whiteSpace = "nowrap";
        divFrom.style.cursor = "default";
      }

      
      acc.push({
        ...task,
        name: (
          <div style={{ display: "inline-block" }}>
            <div
              style={{
                color: "rgb(86, 86, 86)",
                fontSize: "0.7rem",
                padding: "0.15rem 0.2rem 0rem",
                userSelect: "none",
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={() => handleTaskClick(task)}
            >
              {Tasks.length > 0 ? isTaskExpanded ? "▼" : "▶" : ''}
            </div>
            {task.name}
          </div>
        ),
      });

      if (isTaskExpanded) {
        const childTasks = ganttChart.filter(
          (child) => child.parent_id === task.id && child.project_type === "sub_task"
        );
  
        childTasks.forEach((childTask) => {
          const isSubTaskExpanded = expandedSubTasks[childTask.id] || false;
  
          acc.push({
            ...childTask,
            name: (
              <div style={{ display: "inline-block" }}>
                <div
                  style={{
                    color: "rgb(86, 86, 86)",
                    fontSize: "0.7rem",
                    padding: "0.15rem 0.2rem 0rem",
                    userSelect: "none",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                  onClick={() => handleSubTaskClick(childTask)}
                >
                  {isSubTaskExpanded ? "▼" : "▶"}
                </div>
                {childTask.name}
              </div>
            ),
          });
  
          // Add sub-subtasks
          if (isSubTaskExpanded) {
            const subSubTasks = ganttChart.filter(
              (subSub) =>
                subSub.parent_id === childTask.id &&
                subSub.project_type === "sub_sub_task"
            );
  
            subSubTasks.forEach((subSubTask) => {
              acc.push({
                ...subSubTask,
                name: (
                  <div style={{ marginLeft: "1rem" }}>
                    {subSubTask.name}
                  </div>
                ),
              });
            });
          }
        });
      }

      return acc;
    }, []);
    setRows(updatedRows);
  }, [page, expandedTasks, expandedSubTasks, ganttChart, parentTasks]);

  const status = [
    {
      backgroundColor: "#D9BB41",
      label: t("pending"),
    },
    {
      backgroundColor: "var(--primary-color)",
      label: t("active"),
    },
    {
      backgroundColor: "#20BF55",
      label: t("completed"),
    },
    {
      backgroundColor: "var(--secondary-color)",
      label: t("new"),
    },
    {
      backgroundColor: "#CD500C",
      label: t("late"),
    },
  ];

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {status.map((color) => (
          <Box
            key={color.backgroundColor}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "5rem",
                height: "1rem",
                backgroundColor: `${color.backgroundColor}`,
                borderRadius: "3px",
                marginRight: "10px",
              }}
            ></Box>
            <Typography>{color.label}</Typography>
          </Box>
        ))}

        <FormControl sx={{ mt: 2, mb: 2 }}>
          <InputLabel id="demo-simple-select-label">{t("view")} </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewMode}
            size="small"
            sx={{ width: 150 }}
            label="View"
            onChange={handleChange}
          >
            <MenuItem value={"Day"}>{t("day")}</MenuItem>
            <MenuItem value={"Week"}>{t("week")}</MenuItem>
            <MenuItem value={"Month"}>{t("month")}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {ganttChart.length > 0 && (
        <GanttOriginal
          className="GanttOriginal"
          tasks={rows}
          viewMode={viewMode}
          columnWidth={100}
          ganttHeight={400}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <button
          onClick={handleBackPageClick}
          disabled={page === 0}
          className={`mx-5 btn ${page === 0 ? "btn-secondary" : "btn-primary"}`}
        >
          {t("back")}
        </button>
        Page {page / 7 + 1}
        <button
          onClick={handleNextPageClick}
          disabled={parentTasks.length <= page + 7}
          className={`mx-5 btn ${
            parentTasks.length <= page + 7 ? "btn-secondary" : "btn-primary"
          }`}
        >
          {t("next")}
        </button>
      </Box>
    </React.Fragment>
  );
};

export default NewGantt;
