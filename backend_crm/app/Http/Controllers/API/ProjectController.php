<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectSubTask;
use App\Models\ProjectTask;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Validator;
use Carbon;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{

    //all project and subtask
    public function tasklistall(Request $request, $id)
    {
        $user = User::find($id);
        if ($user->role == 'Cliente' or  $user->role == 'Digitador' or  $user->role == 'Assistant' or  $user->role == 'Supervisor') {
            // Get all projects and their associated tasks for the user

            // Get all projects and their associated tasks for the user
            $projects = Project::with(['tasks' => function ($query) {
                $query->with('subtasks');
            }])
                ->whereRaw('JSON_CONTAINS(project_assign_user_id, ?)', ['{"id": ' . $id . '}'])
                // ->paginate(10);
                ->get();

            $response = [];
            foreach ($projects as $project) {
                $projectData = [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'project_assign_user_id' => json_decode($project->project_assign_user_id),
                    'project_status' => $project->project_status,
                    'project_startdate' => $project->project_startdate,
                    'project_enddate' => $project->project_enddate,
                    'project_description' => $project->project_description,
                    'progress' => $project->progress,
                    'tasks' => [],
                ];

                foreach ($project->tasks as $task) {
                    if ($task->project_type === 'task') {
                        $taskData = [
                            'id' => $task->id,
                            'subtask_name' => $task->subtask_name,
                            'subtask_status' => $task->subtask_status,
                            'subtask_startdate' => $task->subtask_startdate,
                            'subtask_enddate' => $task->subtask_enddate,
                            'subtask_description' => $task->subtask_description,
                            'progress' => $task->progress,
                            'project_id' => $task->project_id,
                            'subtasks' => [],
                        ];

                        foreach ($task->subtasks as $subtask) {
                            if ($subtask->project_type === 'subtask') {
                                $subtaskData = [
                                    'id' => $subtask->id,
                                    'subtask_name' => $subtask->subtask_name,
                                    'subtask_status' => $subtask->subtask_status,
                                    'subtask_startdate' => $subtask->subtask_startdate,
                                    'subtask_enddate' => $subtask->subtask_enddate,
                                    'subtask_description' => $subtask->subtask_description,
                                    'progress' => $subtask->progress,
                                ];

                                $taskData['subtasks'][] = $subtaskData;
                            }
                        }

                        $projectData['tasks'][] = $taskData;
                    }
                }
                $response[] = $projectData;
            }

            // Return the response
            return $response;
        } else {
            // Get all projects and their associated tasks for the user
            $projects = Project::with(['tasks' => function ($query) {
                $query->with('subtasks');
            }])
                // ->paginate(10);
                ->get();
            $response = [];
            foreach ($projects as $project) {
                $projectData = [
                    'id' => $project->id,
                    'project_name' => $project->project_name,
                    'project_assign_user_id' => json_decode($project->project_assign_user_id),
                    'project_status' => $project->project_status,
                    'project_startdate' => $project->project_startdate,
                    'project_enddate' => $project->project_enddate,
                    'project_description' => $project->project_description,
                    'progress' => $project->progress,
                    'tasks' => [],
                ];

                foreach ($project->tasks as $task) {
                    if ($task->project_type === 'task') {
                        $taskData = [
                            'id' => $task->id,
                            'subtask_name' => $task->subtask_name,
                            'subtask_status' => $task->subtask_status,
                            'subtask_startdate' => $task->subtask_startdate,
                            'subtask_enddate' => $task->subtask_enddate,
                            'subtask_description' => $task->subtask_description,
                            'progress' => $task->progress,
                            'project_id' => $task->project_id,
                            'subtasks' => [],
                        ];

                        foreach ($task->subtasks as $subtask) {
                            if ($subtask->project_type === 'subtask') {
                                $subtaskData = [
                                    'id' => $subtask->id,
                                    'subtask_name' => $subtask->subtask_name,
                                    'subtask_status' => $subtask->subtask_status,
                                    'subtask_startdate' => $subtask->subtask_startdate,
                                    'subtask_enddate' => $subtask->subtask_enddate,
                                    'subtask_description' => $subtask->subtask_description,
                                    'progress' => $subtask->progress,
                                ];

                                $taskData['subtasks'][] = $subtaskData;
                            }
                        }

                        $projectData['tasks'][] = $taskData;
                    }
                }

                $response[] = $projectData;
            }
            // Return the response
            return $response;
        }

        // Manually decode the 'project_assign_user_id' column before sending it back
        $decodedProjects = $projects->map(function ($project) {
            $project->project_assign_user_id = json_decode($project->project_assign_user_id);
            return $project;
        });

        // Return the projects and their tasks as a JSON response
        return response()->json($decodedProjects);
    }


    //signle project details
    public function getproject($id)
    {
        $project = Project::find($id);
        // Manually decode the 'project_assign_user_id' column
        $project->project_assign_user_id = json_decode($project->project_assign_user_id);
        return [
            'status' => true,
            'data' => $project,
            'msg' => 'Get Project.'
        ];
    }

    // Add a new project
    public function addProject(Request $request)
    {
        $project = [
            'project_name' => $request->project_name,
            'project_status' => $request->project_status,
            'project_startdate' => $request->project_startdate,
            'project_enddate' => $request->project_enddate,
            'project_description' => $request->project_description,
            'progress' => 0,
            'user_id' => $request->user_id,
        ];
        $insert = Project::create($project);
        if ($insert) {
            $task = [
                'project_id' => $insert->id,
                'task_id' => $request->task ? $request->task[0]['id'] : 0,
                'progress' => 0,
                'user_id' =>  $request->user_id
            ];
            $inTask = ProjectTask::create($task);
            if ($inTask) {
                if (count($request->sub_task) > 0) {
                    foreach ($request->sub_task as $sub) {
                        $st = [
                            'project_id'    => $insert->id,
                            'task_id' => $inTask->task_id,
                            'sub_task_id' => $sub['id'],
                            'progress' => 0,
                            'user_id' =>  $request->user_id
                        ];
                        ProjectSubTask::create($st);
                    }
                }
            }
            $assign_arr = [];
            foreach ($request->project_assign_user_id as $assign) {
                $tag = [
                    'project_id' => $insert->id,
                    'assign_user_id' => $assign['id']
                ];
                array_push($assign_arr, $tag);
            }
            $insert->assignUser()->sync_one_to_many($assign_arr);
            return response()->json(['message' => 'Project added successfully', 'project' => $insert], 201);
        }
    }


    public function projectAssignUser(Request $request, $id)
    {
        if (count($request->assign_user_id) > 0) {
            $update = Project::where('id', $id)->first();
            $assign_arr = [];
            foreach ($request->assign_user_id as $assign) {
                $tag = [
                    'project_id' => $update->id,
                    'assign_user_id' => $assign['id']
                ];
                array_push($assign_arr, $tag);
            }
            $update->assignUser()->sync_one_to_many($assign_arr);

            return response()->json(['message' => 'User Assign successfully'], 200);
        } else {
            return response()->json(['message' => 'User Assign  failed'], 400);
        }
    }


    public function projectStatus(Request $request, $id)
    {
        $update = Project::with('assignUser.assinBy')->where('id', $id)->first();
        $update->project_status = $request->status;
        $update->update();
        if ($request->status == 'completed') {
            if (count($update->assignUser) > 0) {
                foreach ($update->assignUser as $assign) {
                    $email = $assign->assinBy->email;
                    Mail::send('emails.projectMailTemplate', [
                        'user' => $assign->assinBy->name,
                        'description' => 'Your Project "' . $update->project_name . '" is Complete Successfully.',
                    ], function ($message) use ($email, $assign) {
                        $message->to($email)->subject('CRM Cliente Notification');
                    });
                }
            }
        }
        return response()->json(['message' => 'Project Status Update successfully'], 200);
    }

    // Edit an existing project
    public function editProject(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->project_name = $request->input('project_name');
        $project->project_status = $request->input('project_status');
        $project->project_startdate = $request->input('project_startdate');
        $project->project_enddate = $request->input('project_enddate');
        $project->project_description = $request->input('project_description');
        $project->user_id = $request->input('user_id');
        $project->progress = $request->input('progress');
        $project->save();

        return response()->json(['message' => 'Project updated successfully', 'project' => $project], 200);
    }

    // Delete a project
    public function deleteProject($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->delete();
        DB::table('projects_task')->where('project_id', $id)->delete();
        return response()->json(['message' => 'Project deleted successfully'], 200);
    }

    // List all projects
    public function listProjects($id)
    {
        $user = User::find($id);
        if ($user->role == 'Cliente' or  $user->role == 'Digitador' or  $user->role == 'Assistant' or  $user->role == 'Supervisor') {
            $projects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->with('tasks.taskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->paginate(5);
        } else {
            $projects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->with('tasks.taskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName')
                ->paginate(2);
        }
        return response()->json(['projects' => $projects], 200);
    }
}