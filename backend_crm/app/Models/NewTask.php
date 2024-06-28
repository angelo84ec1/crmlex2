<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewTask extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function assignUser()
    {
        return $this->hasMany(NewTaskAssignUser::class);
    }
    public function subTask()
    {
        return $this->hasMany(NewSubTask::class);
    }
}
