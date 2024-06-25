<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewSubTask;
use App\Models\ProjectSubTask;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;
class NewSubTaskController extends Controller{

    public function store(Request $request)
    {
        $project_id = $request->input('project_id');
        $task = [
            'new_task_id' => $request->task_id,
            'title' => $request->title,
            'start_date' => Carbon::createFromDate($request->start_date)->format('Y/m/d'),
            'description' => $request->description,
            'end_date' => Carbon::createFromDate($request->end_date)->format('Y/m/d'),
            'created_by' => $request->user_id,
        ];
        $create = NewSubTask::create($task);
        if($create){
            if($project_id){
                $st=[
                    'project_id'	=>$project_id,
                    'task_id' => $request->task_id,
                    'sub_task_id'=> $create->id,
                    'progress'=> 0,
                    'user_id' =>  $request->user_id
                ];
                ProjectSubTask::create($st);
            }
            $assign_arr = [];
            foreach ($request->assign_user_id as $assign){
                $tag = [
                    'new_sub_task_id'=>$create->id,
                    'assign_user_id'=>$assign['id']
                ];
                array_push($assign_arr,$tag);
            }
            $create->assignUser()->sync_one_to_many($assign_arr);
            return response()->json(['message' => 'Sub Task Create successfully'],200);
        }else{
            return response()->json(['message' => 'Sub Task Create failed'],400);
        }
    }
    public function update(Request $request,$id)
    {
        $task = [
            'title' => $request->title,
            'start_date' => Carbon::createFromDate($request->start_date)->format('Y/m/d'),
            'description' => $request->description,
            'progress' => $request->progress?$request->progress:0,
            'end_date' => Carbon::createFromDate($request->end_date)->format('Y/m/d'),
            'updated_by' => $request->user_id,
        ];
        $update = NewSubTask::where('id',$id)->update($task);
        if($update){
             return response()->json(['message' => 'Sub Task Update successfully'],200);
        }else{
             return response()->json(['message' => 'Sub Task Update failed'],400);
        }
    }

    public function assignupdate(Request $request,$id)
    {
        if(count($request->assign_user_id) > 0){
            $update = NewSubTask::where('id',$id)->first();
            $assign_arr = [];
            foreach ($request->assign_user_id as $assign){
                $tag = [
                    'new_task_id'=>$update->id,
                    'assign_user_id'=>$assign['id']
                ];
                array_push($assign_arr,$tag);
            }
            $update->assignUser()->sync_one_to_many($assign_arr);

            return response()->json(['message' => 'Sub Task Update successfully'],200);
        }else{
            return response()->json(['message' => 'Sub Task Update failed'],400);
        }
    }

    public function statusupdate(Request $request,$id)
    {
        $update = NewSubTask::where('id',$id)->first();
        $update->status = $request->status;
        $update->updated_by = $request->user_id;
        $update->update();
        return response()->json(['message' => 'Sub Task Status Update successfully'],200);

    }

    public function delete($id)
    {
        NewSubTask::where('id',$id)->delete();
        ProjectSubTask::where('sub_task_id',$id)->delete();
        return response()->json(['message' => 'Sub Task Delete successfully'],200);
    }


}

