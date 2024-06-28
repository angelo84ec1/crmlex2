<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function assignUser()
    {
        return $this->hasMany(ProjectAssignUser::class);
    }
    public function tasks()
    {
        return $this->hasMany(ProjectTask::class,  'project_id', 'id');
    }

}

