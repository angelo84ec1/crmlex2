<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectSubTask extends Model
{
    use HasFactory;
    protected $table = 'projects_sub_task';
    protected $guarded = ['id'];


    public function subTaskName()
    {
        return $this->belongsTo(NewSubTask::class, 'sub_task_id','id');
    }

}
