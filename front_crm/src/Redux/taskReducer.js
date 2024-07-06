import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchTasks = createAsyncThunk(
  'fetchTasks',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/projects/${params.user_id}?page=${params.page + 1}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// ------------------------------------------------------ADD NEW TASK-------------------------------

export const fetchProjectTasks = createAsyncThunk(
    'fetchProjectTasks',
    async (params, thunkAPI) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/task/list`);
        return response.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const addTasks = createAsyncThunk(
    'addTasks',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/task/store`, {
          title: params.title,
          start_date: params.startDate,
          assign_user_id: params.customer,
          description: params.discription,
          end_date: params.dueDate,
          extend_days: params.extend_days,
          sub_task: params.sub_task,
          subtask_start_date: params.subtaskStartDate,
          subtask_end_date: params.subtaskDueDate,
          user_id: params.user_id,
          project_id: params.project_id,
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);

      }
    }
);
export const updateNewTask = createAsyncThunk(
    'updateNewTask',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/task/update/${params.id}`, {
          title: params.title,
          start_date: params.startDate,
          assign_user_id: params.customer,
          description: params.discription,
          end_date: params.dueDate,
          extend_days: params.extend_days,
          user_id: params.user_id,
          progress: params.progress,
        });
        const data = {
          ...response.data,
          task: {
            task_id: params.id,
            project_id: params.project_id,
            title: params.title,
            start_date: params.startDate,
            assign_user_id: params.customer,
            description: params.discription,
            end_date: params.dueDate,
            extend_days: params.extend_days,
            user_id: params.user_id,
            progress: params.progress,
          }
        }
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const deleteNewTask = createAsyncThunk(
    'deleteTask',
    async (params, thunkAPI) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/task/delete/${params}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);
export const editNewTask = createAsyncThunk(
    'editNewTask',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/task/assign-update/${params.id}`, {
          id: params.id,
          assign_user_id: params.customer,
          user_id: params.user_id,
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);
export const editNewSubTask = createAsyncThunk(
    'editNewSubTask',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/sub-task/assign-update/${params.id}`, {
          id: params.id,
          assign_user_id: params.customer,
          user_id: params.user_id,
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const taskStatusUpdate = createAsyncThunk(
    'taskStatusUpdate',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/task/status-update/${params.id}`, {
          status: params.task_status,
          user_id: params.user_id,
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

// ------------------------------------------------------ADD NEW TASK END-------------------------------

// ------------------------------------------------------ADD TASK-------------------------------
export const addProject = createAsyncThunk(
  'addProject',
  async (params, thunkAPI) => {
    // 
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/projects`, {
        project_name: params.title,
        project_assign_user_id: params.customer,
        project_status: 'pending',
        project_startdate: params.startDate,
        project_enddate: params.endDate,
        task: params.task,
        sub_task: params.sub_task,
        project_description: params.discription,
        user_id: params.user_id
      });
      // 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// --------------------------------------------Edit TASK-------------------------------------
export const editTask = createAsyncThunk(
  'editTask',
  async (params, thunkAPI) => {
    // console.log(params)
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/editproject/${params.id}`, {
        id: params.id,
        project_name: params.title,
        project_assign_user_id: params.customer,
        project_status: params.project_status,
        project_startdate: params.startDate,
        project_enddate: params.dueDate,
        project_description: params.discription,
        user_id: params.user_id,
        progress: params.progress
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editProjectAssign = createAsyncThunk(
    'editProjectAssign',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/project-assign-update/${params.id}`, {
          id: params.id,
          assign_user_id: params.customer,
          user_id: params.user_id,
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);
export const editProjectStatus = createAsyncThunk(
    'editProjectStatus',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/project-status-update/${params.id}`, {
          status: params.project_status,
          user_id: params.user_id,
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

//-------------------------------------DELETE TASK-------------------------------------

export const deleteTask = createAsyncThunk(
  'deleteTask',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/deleteprojects/${params}`);
      // 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


//------------------------------------------------------ ADD sub TASK----------------------------------------
export const addSubTasks = createAsyncThunk(
  'addSubTasks',
  async (params, thunkAPI) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/sub-task/store`, {
        title: params.title,
        start_date: params.startDate,
        end_date: params.dueDate,
        assign_user_id: params.customer,
        description: params.discription,
        user_id: params.user_id,
        task_id: params.task_id,
        project_id: params.project_id,
      });
      return response.data;
    } catch (error) {
      const serializedError = {
        message: error.message,
      };
      return thunkAPI.rejectWithValue(serializedError);
    }
  },
  {
    // Serialize the error value in case of rejection
    serializeError: true
  }
);

//--------------------------------------------------EDIT SUB TASK----------------------------

export const editSubTask = createAsyncThunk(
  'editSubTask',
  async (params, thunkAPI) => {
    // 
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/sub-task/update/${params.id}`, {
        title: params.title,
        start_date: params.startDate,
        end_date: params.dueDate,
        description: params.discription,
        user_id: params.user_id,
        task_id: params.task_id,
        progress: params.progress,
      });
      // console.log(response)
      let data = {
        ...response.data,
        subtask: {
          id: params.id,
          title: params.title,
          start_date: params.startDate,
          end_date: params.dueDate,
          description: params.discription,
          user_id: params.user_id,
          task_id: params.task_id,
          progress: params.progress,
          project_id: params.project_id,
        }
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editSubTaskStatus = createAsyncThunk(
    'editsubtaskstatus',
    async (params, thunkAPI) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/sub-task/status-update/${params.id}`, {
          status: params.subtask_status,
          user_id: params.user_id,
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

// -----------------------------------------------------DELETE SUB TASK----------------------------------
export const deleteSubTask = createAsyncThunk(
  'deleteSubTask',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/api/sub-task/delete/${params}`);
      // 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// -----------------------------------------------------Send Mail----------------------------------
export const sendMail = createAsyncThunk(
  'sendMail',
  async (params, thunkAPI) => {
    try {

      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/api/sendmail`, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



const initialState = {
  tasks: [],
  projectTasks: [],
  product: {},
  taskStatus: {
    task: {
      project_type: ''
    }
  },
  projectStatus: '',
  editStatus: {},
  delTaskStatus: {},
  delSubTaskStatus: {},
  status: 'idle',
  mailStatus: 'idle',
  currentTask: {},
  currentProject: {},
  mails: [],
  mailResponse: {},
  edittaskStatus: {},
  editsubtaskstatus: {},

  editNewProject: {},
  editNewTask: {},
  editNewSubTask: {},

}

export const taskSlice = createSlice({
  name: 'taskReducer',
  initialState,
  reducers: {


    resetTask: (state) => {
      state.taskStatus = {
        task: { project_type: '' }
      }
      state.delTaskStatus = ''
      state.delSubTaskStatus = ''
      state.status = 'idle'
      state.editStatus = ''
      state.projectStatus = ''
      state.edittaskStatus = ''
      state.editsubtaskstatus = ''
      state.mailResponse = {}
      state.editNewProject = {},
      state.editNewTask = {},
      state.editNewSubTask = {}
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload
    },
    setCurrentProject: (state, action) => {
      // console.log(action.payload)
      state.currentProject = action.payload
    },
    addProject: (state, action) => {
      // state.tasks = initialState.tasks
      const newTask = action.payload;
      return {
        ...state,
        projectTasks: [...state.projectTasks, newTask]
      }
    },
    updateProject: (state, action) => {
      const updatedProject = action.payload;
      state.projectTasks = state.projectTasks.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
    },
    deleteProject: (state, action) => {
      state.projectTasks = state.projectTasks.filter((task) => task.id != action.payload.id)

    },

    addTaskFun: (state, action) => {
      const newTask = action.payload;
      const newSubTasks = state.projectTasks.map((task) => {
        console.log(task.id, newTask.project_id);
        if (task.id === Number(newTask.project_id)) {
          const existingSubTasks = task.tasks;
          const isDuplicate = existingSubTasks.some((subtask) => subtask.id === newTask.id);

          if (!isDuplicate) {
            const updatedTasks = [...existingSubTasks, newTask];
            return { ...task, tasks: updatedTasks };
          }
        }

        return task;
      });

      state.projectTasks = newSubTasks;
    }


    ,
    updateTask: (state, action) => {
      state.projectTasks = state.projectTasks.map((task) => {
        if (task.id === +action.payload.project_id) {
          task.tasks = task.tasks.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          );
        }
        return task;
      });

    }
    ,
    deleteTaskFun: (state, action) => {
      // state.tasks = initialState.tasks

      state.projectTasks = state.projectTasks.map((task) => {
        // If the current task has the same ID as the action payload project ID
        if (task.id === +action.payload.project_id) {
          task.tasks = task.tasks.filter((item) => item.id !== action.payload.id);
        }
        // Always return the current task, even if it wasn't modified
        return task;
      });
    },
    addSubTaskFun: (state, action) => {
      const newSubTask = action.payload;

      state.projectTasks.map((project) => {
        if (project.id === Number(newSubTask.project_id)) {
          project.tasks.map((task) => {

            // if (!task.subtasks) {
            //   task = [...task, newSubTask]
            // }
            if (task.id === Number(newSubTask.task_id)) {
              if (!task.subtasks) {
                task.subtasks = [newSubTask];
              } else {
                task.subtasks.push(newSubTask);
              }
            }

            // if(task.id === Number(newSubTask.task_id)) {
            //   task.subtasks = [...task.subtasks, newSubTask];
            // }
          });
        }
      });
    }

    ,

    updateSubTask: (state, action) => {
      const updatedSubTask = action.payload;

      state.projectTasks.forEach((project) => {
        if (project.id === Number(updatedSubTask.project_id)) {
          project.tasks.forEach((task) => {
            if (task.id === Number(updatedSubTask.task_id)) {
              task.subtasks = task.subtasks.map((subtask) => {
                if (subtask.id === updatedSubTask.id) {
                  return updatedSubTask;
                }
                return subtask;
              });
            }
          });
        }
      });


    },
    delSubTaskFun: (state, action) => {
      // console.log(action.payload)
      // Use map() to create a new array of project tasks
      state.projectTasks = state.projectTasks.map((task) => {
        // If the current task has the same ID as the action payload project ID
        if (task.id === +action.payload.project_id) {
          task.tasks = task.tasks.filter((item) => item.id !== action.payload.id);
        }
        // Always return the current task, even if it wasn't modified
        return task;
      });
    },
    addMail: (state, action) => {
      state.mails = state.mails.concat(action.payload)

    }




  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload != null) {
          state.tasks = action.payload.projects;
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projectStatus = action.payload;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.editNewProject = action.payload;
        console.log("After *********", action.payload);
        let previous = state.tasks.filter((task) => task.id === action.payload?.project?.id);
        state.tasks = state.tasks.map((task) => {
          if(task.id === action.payload?.project?.id){
            let updatedProject = {
              ...previous[0],
              project_name: action.payload?.project?.project_name,
              project_description: action.payload?.project?.project_description,
              project_status: action.payload?.project?.project_status,
              project_startdate: action.payload?.project?.project_startdate,
              project_enddate: action.payload?.project?.project_enddate,
              progress: action.payload?.project?.progress,
            };
            console.log("Updated Project", updatedProject);
            console.log("previous", previous[0])
            return updatedProject;
          }
          return task;
        }
        );
        state.status = 'idle'
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editProjectAssign.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProjectAssign.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projectStatus = action.payload;
      })
      .addCase(editProjectAssign.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editProjectStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProjectStatus.fulfilled, (state, action) => {
        state.projectStatus = action.payload;
      })
      .addCase(editProjectStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.delTaskStatus = action.payload;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.taskStatus = action.payload;
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.taskStatus.message = "Something went wrong";
        state.error = action.payload;
      })
      .addCase(updateNewTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNewTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.editNewTask = action.payload;
        console.log(action.payload, "payload")
        state.tasks = state.tasks.map((project) => {
          if (project.id == action.payload?.task?.project_id) {
            console.log("Task", project.tasks);
            project.tasks = project.tasks.map((item) => {
              if (item.task_id == action.payload.task.task_id) {
                // change the task_name field to payload.task array
                let prevTaskName = item.task_name;
                let updated = {
                  ...item,
                  task_name:{
                    ...prevTaskName,
                    ...action.payload.task
                  }
                }
                return updated;
              }
              return item;
            }
            );
          }
          return project;
        });
      })
      .addCase(updateNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editNewTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editNewTask.fulfilled, (state, action) => {
        state.editStatus = action.payload;
      })
      .addCase(editNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editNewSubTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editNewSubTask.fulfilled, (state, action) => {
        state.editsubtaskstatus = action.payload;
      })
      .addCase(editNewSubTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(taskStatusUpdate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(taskStatusUpdate.fulfilled, (state, action) => {
        state.edittaskStatus = action.payload;
      })
      .addCase(taskStatusUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editSubTaskStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editSubTaskStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.editsubtaskstatus = action.payload;
      })
      .addCase(editSubTaskStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProjectTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload != null) {
          state.projectTasks = action.payload;
        }
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addSubTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSubTasks.fulfilled, (state, action) => {
        state.taskStatus = action.payload;
      })
      .addCase(addSubTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.taskStatus.message = "Something went wrong";
        state.error = action.payload;
      })
      .addCase(editSubTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editSubTask.fulfilled, (state, action) => {
        state.editNewSubTask = action.payload;
        // find project index and in that project task index and in that task subtask index
        console.log(action.payload, "payload")
        let projIdx = state.tasks.findIndex((project) => project.id == action.payload.subtask.project_id);
        console.log(projIdx, "projIdx")
        console.log(state.tasks[projIdx].tasks, "state.tasks[projIdx]")
        let taskIdx = state.tasks[projIdx].tasks.findIndex((task) => task.task_id == action.payload.subtask.task_id);
        let subtaskIdx = state.tasks[projIdx].tasks[taskIdx].sub_tasks.findIndex((subtask) => subtask.sub_task_id == action.payload.subtask.id);
        // update the subtask
        state.tasks[projIdx].tasks[taskIdx].sub_tasks[subtaskIdx].sub_task_name = {
          ...state.tasks[projIdx].tasks[taskIdx].sub_tasks[subtaskIdx].sub_task_name,
          ...action.payload.subtask
        }
      })
      .addCase(editSubTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteSubTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSubTask.fulfilled, (state, action) => {
        state.delSubTaskStatus = action.payload;
      })
      .addCase(deleteSubTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sendMail.pending, (state) => {
        state.mailStatus = 'loading';
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.mailStatus = 'succeeded';
        state.mailResponse = action.payload;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.mailStatus = 'failed';
        state.error = action.payload;
      });
  }
})



// Action creators are generated for each case reducer function
export const { resetTask, edittaskStatus, editsubtaskstatus, addSubTaskFun, setCurrentTask, deleteTaskFun, delSubTaskFun, updateTask, updateSubTask, addMail, setCurrentProject, addTaskFun, updateProject, deleteProject } = taskSlice.actions

export default taskSlice.reducer
