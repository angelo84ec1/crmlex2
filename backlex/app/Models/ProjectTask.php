<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{
    use HasFactory;
    protected $table = 'projects_task';
    protected $guarded = ['id'];

    public function taskName()
    {
        return $this->belongsTo(NewTask::class,  'task_id', 'id');
    }
    public function subTasks()
    {
        return $this->hasMany(ProjectSubTask::class, 'project_id','project_id');
    }

    public function tasksAssignUser()
    {
        return $this->hasMany(NewTaskAssignUser::class, 'new_task_id','task_id');
    }

}
