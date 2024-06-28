<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewTaskAssignUser extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function assinBy()
    {
        return $this->belongsTo(User::class,'assign_user_id','id');
    }
}
