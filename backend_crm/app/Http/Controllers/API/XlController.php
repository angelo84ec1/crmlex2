<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\PdfService;
use App\Exports\ProjectsExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\User;
use App\Models\Project;

class XlController extends Controller
{
    protected $pdfService;

    public function __construct(PdfService $pdfService)
    {
        $this->pdfService = $pdfService;
    }

    public function ResumeProjectsXL($id, $page)
    {
        $user = User::find($id);
        $projectsPerPage = 10;
        if ($user->role == 'Cliente' or  $user->role == 'Digitador' or  $user->role == 'Assistant' or  $user->role == 'Supervisor') {
            $projects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->with('tasks.taskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName')
                ->whereHas('assignUser', function ($query) use ($id) {
                    $query->where('assign_user_id', $id);
                })
                ->orderBy('id', 'DESC')
                // ->skip(($page - 1) * $projectsPerPage)
                // ->take($projectsPerPage)
                ->get();
        } else {
            $projects = Project::with('tasks.taskName', 'assignUser.assinBy')
                ->with('tasks.taskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName.assignUser.assinBy')
                ->with('tasks.subTasks.subTaskName')
                ->orderBy('id', 'DESC')
                // ->skip(($page - 1) * $projectsPerPage)
                // ->take($projectsPerPage)
                ->get();
        }
        // echo "<pre>";
        // echo print_r($projects->toArray());
        // echo "</pre>";
        // exit();
    return Excel::download(new ProjectsExport($projects), 'projects.xlsx');
    }
}
