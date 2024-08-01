<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewTask;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectTask;

use App\Models\User;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

class DashboardController extends Controller
{
    public function index($user_id)
    {

        $userId = $user_id;
        $user = User::find($user_id);
        $id = $user_id;

        if ($user->role == 'Cliente' or  $user->role == 'Digitador' or  $user->role == 'Assistant' or  $user->role == 'Supervisor') {
            $totalProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->count();
            $totalTasks = ProjectTask::with('tasksAssignUser')
                ->whereHas('tasksAssignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })->count();

            $totalUsers = User::count();

            $completedProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->where('project_status', 'completed')
                ->count();

            $activeProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->where('project_status', 'active')
                ->count();
            $endedProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->where('project_status', 'ended')
                ->count();
            $lateProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->where('project_status', 'late')
                ->count();
            $newProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->where('project_status', 'new')
                ->count();
            $pendingProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->where('project_status', 'pending')
                ->count();


            $graphData = [
                'completed' => Project::with('tasks.taskName', 'assignUser.assinBy')
                    ->whereHas('assignUser', function ($query) use ($id) {
                        $query->where('assign_user_id', $id);
                    })
                    ->where('project_status', 'completed')
                    ->count(),
                'active' => Project::with('tasks.taskName', 'assignUser.assinBy')
                    ->whereHas('assignUser', function ($query) use ($id) {
                        $query->where('assign_user_id', $id);
                    })
                    ->where('project_status', 'active')
                    ->count(),
                'ended' => Project::with('tasks.taskName', 'assignUser.assinBy')
                    ->whereHas('assignUser', function ($query) use ($id) {
                        $query->where('assign_user_id', $id);
                    })
                    ->where('project_status', 'ended')
                    ->count()
            ];
            $projects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                //            ->where('project_status', 'pending')
                ->get();
        } else {
            //        $totalProjects = Project::count();
            $totalProjects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->count();

            $totalTasks = ProjectTask::with('tasksAssignUser')
                ->whereHas('tasksAssignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })->count();
            //        $totalTasks = ProjectTask::join('projects', 'projects.id', '=', 'projects_task.project_id')->count();
            $totalUsers = User::count();
            $completedProjects = Project::where('project_status', 'completed')->count();
            $activeProjects = Project::where('project_status', 'active')->count();
            $endedProjects = Project::where('project_status', 'ended')->count();
            $lateProjects = Project::where('project_status', 'late')->count();
            $newProjects = Project::where('project_status', 'new')->count();
            $pendingProjects = Project::where('project_status', 'pending')->count();

            $graphData = [
                'completed' => Project::where('project_status', 'completed')->count(),
                'active' => Project::where('project_status', 'active')->count(),
                'ended' => Project::where('project_status', 'ended')->count()
            ];

            $projects = DB::table('projects')
                ->select(
                    'projects.id',
                    'projects.project_name',
                    'projects.project_status',
                    'projects.project_startdate',
                    'projects.project_enddate',
                    'projects.project_description',
                    'projects.user_id',
                    'projects.created_at',
                    'projects.updated_at',
                    'users.id',
                    'users.name',
                    'users.user_pic'
                )
                ->join('projects_assign_user', 'projects.id', '=', 'projects_assign_user.project_id')
                ->join('users', 'projects_assign_user.assign_user_id', '=', 'users.id')
                ->where('projects_assign_user.assign_user_id', $userId)
                //                    ->where('projects.project_status', 'pending')
                ->get();

            $baseURL = URL::to('/');

            $projects->map(function ($project) use ($baseURL) {
                $project->user_pic = $baseURL . '/' . $project->user_pic;
                return $project;
            });

            // Now the user_pic column in $projects collection will have the full URL

        }
        $this->taskUpdate();

        $response = [
            'total_projects' => $totalProjects,
            'total_tasks' => $totalTasks,
            'total_users' => $totalUsers,
            'completed_projects' => $completedProjects,
            'active_projects' => $activeProjects,
            'ended_projects' => $endedProjects,
            'pending_projects' => $pendingProjects,
            'latest_projects' => $projects,
            'newProjects' => $newProjects,
            'lateProjects' => $lateProjects

        ];

        return response()->json($response);
    }


    public function taskUpdate()
    {
        $next_due_date = date('Y-m-d', strtotime("+30 days"));
        $data =  NewTask::where('status', '!=', 'disabled')->whereDate('end_date', date("Y-m-d"))->get();
        foreach ($data as $key => $task) {
            if ($task->extend_days) {
                if ($task->status == 'completed') {
                    $task->update(['status' => 'disabled']);
                } else {
                    $task->update(['end_date' => $next_due_date]);
                }
            }
        }
    }


    public function notification($user_id)
    {
        // Fetch the user from the "users" table
        $user = DB::table('users')
            ->select('role')
            ->where('id', $user_id)
            ->first();

        if ($user) {
            $role = $user->role;

            // Fetch notifications from the database based on the user role
            $query = DB::table('notifications')
                ->select('notifications.noti_id', 'notifications.noti_title', 'notifications.noti_desc', 'notifications.user_id', 'notifications.add_datettime', 'users.name', 'users.role')
                ->join('users', 'users.id', '=', 'notifications.user_id');


            if ($role === 'Administrador') {
                $notifications = $query->get();
            } else {
                $notifications = $query->where('notifications.user_id', $user_id)->get();
            }

            // Return the JSON response
            return response()->json($notifications);
        }

        // User not found
        return response()->json(['error' => 'User not found'], 404);
    }


    public function showTasksByMonth($user_id)
    {
        $user = User::find($user_id);

        if ($user->role == 'Cliente' or  $user->role == 'Digitador' or  $user->role == 'Assistant' or  $user->role == 'Supervisor') {
            $id = $user_id;
            // Fetch projects and their associated tasks from the database
            $projects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->with('tasks.taskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->select(
                    'id',
                    'project_name',
                    'project_startdate',
                    'project_enddate'
                )
                ->get();
        } else {
            // Fetch projects from the database
            $projects = DB::table('projects')
                ->select('id', 'project_name', 'project_startdate', 'project_enddate')
                ->where('user_id', $user_id)
                ->get();
        }
        // Format the projects into the desired JSON response structure
        $response = [];
        foreach ($projects as $project) {
            $event = [
                'event_id' => $project->id,
                'title' => $project->project_name,
                'start' => $project->project_startdate,
                'end' => $project->project_enddate,
            ];
            $response[] = $event;
        }

        // Return the JSON response
        return response()->json($response);
    }



    public function showGanttChart($user_id)
    {
        $user = User::find($user_id);
        $id = $user;
        $currentDateTime = Carbon::now();
        if ($user->role == 'Cliente' || $user->role == 'Digitador' || $user->role == 'Assistant' || $user->role == 'Supervisor') {
            // Retrieve projects based on the user_id
            $projects = Project::with('assignUser.assinBy', 'tasks.taskName.assignUser.assinBy', 'tasks.taskName.subTask.assignUser.assinBy')
                ->whereHas('assignUser', function ($quary) use ($user) {
                    $quary->where('assign_user_id', $user->id);
                })
                ->orderBy('id', 'DESC')
                ->get();
            // Prepare the JSON response
            $data = [];
            foreach ($projects as $project) {
                $assign = [];
                foreach ($project->assignUser as $asUser) {
                    array_push($assign, $asUser?->assinBy?->name);
                }
                if (count($assign) > 0) {
                    $assignUsers = implode(', ', $assign);
                } else {
                    $assignUsers = '';
                }
                $data1 = [
                    'type' => 'project',
                    'project_type' => 'task',
                    'id' => $project->id,
                    'name' => $project->project_name . " (" . $assignUsers . ")",
                    'start' => Carbon::parse($project->project_startdate)->format('Y-m-d H:i'),
                    'end' => Carbon::parse($project->project_enddate)->format('Y-m-d H:i'),
                    'progress' => $project->progress ?? 0,
                    'hideChildren' => true,
                    'detests' => $currentDateTime,
                    'statusdelte' => $project->project_status,

                    'styles' => [
                        'backgroundColor' => '#CFD8D7',
                        'progressSelectedColor' => ($project->project_status === 'completed') ? '#20BF55' : (($project->project_status === 'new') ? '#8E2DE2' : (($project->project_status === 'late') ? '#CD500C' : (($project->project_status === 'pending') ? '#D9BB41' : '#4A00E0'))),
                    ],
                ];

                $data[] = $data1;
                foreach ($project->tasks as $key => $task) {
                    $assign = [];
                    foreach ($task->taskName->assignUser as $asUser) {
                        array_push($assign, $asUser?->assinBy?->name);
                    }
                    if (count($assign) > 0) {
                        $assignUsers = implode(', ', $assign);
                    } else {
                        $assignUsers = '';
                    }
                    $taskData = [
                        'type' => 'project',
                        'project_type' => 'sub_task',
                        'parent_id' => $project->id,
                        'id' => $project->id . '1788968',
                        'name' => $task->taskName->title . " (" . $assignUsers . ")",
                        'start' => Carbon::parse($task->taskName->start_date)->format('Y-m-d H:i'),
                        'end' => Carbon::parse($task->taskName->end_date)->format('Y-m-d H:i'),
                        'progress' => $task->taskName->progress ?? 0,
                        'detests' => $currentDateTime,
                        'statusdelte' => $task->taskName->status,

                        'styles' => [
                            'backgroundColor' => '#CFD8D7',
                            'progressSelectedColor' => ($task->status === 'completed') ? '#20BF55' : (($task->status === 'new') ? '#8E2DE2' : (($task->status === 'late') ? '#CD500C' : (($task->status === 'pending') ? '#D9BB41' : '#4A00E0'))),
                        ],
                    ];

                    $data[] = $taskData;
                    foreach ($task->taskName->subTask as $key => $stask) {
                        $assignSub = [];
                        foreach ($stask->assignUser as $asUser) {
                            array_push($assignSub, $asUser?->assinBy?->name);
                        }
                        if (count($assignSub) > 0) {
                            $assignsubUsers = implode(', ', $assignSub);
                        } else {
                            $assignsubUsers = '';
                        }
                        $subTaskData = [
                            'type' => 'project',
                            'parent_id' => $project->id . '1788968',
                            'project_type' => 'sub_sub_task',
                            'id' => $project->id . $key,
                            'name' => $stask->title . " (" . $assignsubUsers . ")",
                            'start' => Carbon::parse($stask->start_date)->format('Y-m-d H:i'),
                            'end' => Carbon::parse($stask->end_date)->format('Y-m-d H:i'),
                            'progress' => $stask->progress ?? 0,
                            'detests' => $currentDateTime,
                            'statusdelte' => $stask->status,
                            'styles' => [
                                'backgroundColor' => '#CFD8D7',
                                'progressSelectedColor' => ($stask->status === 'completed') ? '#20BF55' : (($stask->status === 'new') ? '#8E2DE2' : (($stask->status === 'late') ? '#CD500C' : (($stask->status === 'pending') ? '#D9BB41' : '#4A00E0'))),
                            ],
                        ];
                        $data[] = $subTaskData;
                    }
                }
            }
        } else {
            // Retrieve projects based on the user_id
            $projects = Project::with('assignUser.assinBy', 'tasks.taskName.assignUser.assinBy', 'tasks.taskName.subTask.assignUser.assinBy')->orderBy('id', 'DESC')->get();
            // Prepare the JSON response
            $data = [];
            foreach ($projects as $project) {
                $assign = [];
                foreach ($project->assignUser as $asUser) {
                    array_push($assign, $asUser?->assinBy?->name);
                }
                if (count($assign) > 0) {
                    $assignUsers = implode(', ', $assign);
                } else {
                    $assignUsers = '';
                }
                $data1 = [
                    'type' => 'project',
                    'id' => $project->id,
                    'project_type' => 'task',
                    'name' => $project->project_name . " (" . $assignUsers . ")",
                    'start' => Carbon::parse($project->project_startdate)->format('Y-m-d H:i'),
                    'end' => Carbon::parse($project->project_enddate)->format('Y-m-d H:i'),
                    'progress' => $project->progress ?? 0,
                    'hideChildren' => true,
                    'detests' => $currentDateTime,
                    'statusdelte' => $project->project_status,

                    'styles' => [
                        'backgroundColor' => '#CFD8D7',
                        'progressSelectedColor' => ($project->project_status === 'completed') ? '#20BF55' : (($project->project_status === 'new') ? '#8E2DE2' : (($project->project_status === 'late') ? '#CD500C' : (($project->project_status === 'pending') ? '#D9BB41' : '#4A00E0'))),
                    ],
                ];

                $data[] = $data1;
                foreach ($project->tasks as $key => $task) {
                    $assign = [];
                    foreach ($task->taskName->assignUser as $asUser) {
                        array_push($assign, $asUser?->assinBy?->name);
                    }
                    if (count($assign) > 0) {
                        $assignUsers = implode(', ', $assign);
                    } else {
                        $assignUsers = '';
                    }
                    $taskData = [
                        'type' => 'project',
                        'parent_id' => $project->id,
                        'project_type' => 'sub_task',
                        'id' => $project->id . '1788968',
                        'name' => $task->taskName->title . " (" . $assignUsers . ")",
                        'start' => Carbon::parse($task->taskName->start_date)->format('Y-m-d H:i'),
                        'end' => Carbon::parse($task->taskName->end_date)->format('Y-m-d H:i'),
                        'progress' => $task->taskName->progress ?? 0,
                        'detests' => $currentDateTime,
                        'statusdelte' => $task->taskName->status,

                        'styles' => [
                            'backgroundColor' => '#CFD8D7',
                            'progressSelectedColor' => ($task->status === 'completed') ? '#20BF55' : (($task->status === 'new') ? '#8E2DE2' : (($task->status === 'late') ? '#CD500C' : (($task->status === 'pending') ? '#D9BB41' : '#4A00E0'))),
                        ],
                    ];

                    $data[] = $taskData;
                    foreach ($task->taskName->subTask as $key => $stask) {
                        $assignSub = [];
                        foreach ($stask->assignUser as $asUser) {
                            array_push($assignSub, $asUser?->assinBy?->name);
                        }
                        if (count($assignSub) > 0) {
                            $assignsubUsers = implode(', ', $assignSub);
                        } else {
                            $assignsubUsers = '';
                        }
                        $subTaskData = [
                            'type' => 'project',
                            'parent_id' => $project->id . '1788968',
                            'project_type' => 'sub_sub_task',
                            'id' => $project->id . $key,
                            'name' => $stask->title . " (" . $assignsubUsers . ")",
                            'start' => Carbon::parse($stask->start_date)->format('Y-m-d H:i'),
                            'end' => Carbon::parse($stask->end_date)->format('Y-m-d H:i'),
                            'progress' => $stask->progress ?? 0,
                            'detests' => $currentDateTime,
                            'statusdelte' => $stask->status,
                            'styles' => [
                                'backgroundColor' => '#CFD8D7',
                                'progressSelectedColor' => ($stask->status === 'completed') ? '#20BF55' : (($stask->status === 'new') ? '#8E2DE2' : (($stask->status === 'late') ? '#CD500C' : (($stask->status === 'pending') ? '#D9BB41' : '#4A00E0'))),
                            ],
                        ];
                        $data[] = $subTaskData;
                    }
                }
            }
        }

        // Return the JSON response
        return response()->json($data);
    }
}
