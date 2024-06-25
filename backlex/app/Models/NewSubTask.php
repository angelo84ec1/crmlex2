<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewSubTask extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function assignUser()
    {
        return $this->hasMany(SubTaskAssignUser::class);
    }
}
