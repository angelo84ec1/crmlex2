<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewSubTask;
use App\Models\NewTask;
use App\Models\ProjectSubTask;
use App\Models\ProjectTask;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;
class NewTaskController extends Controller{

    public function index()
    {
        $task = NewTask::with('assignUser.assinBy','subTask.assignUser.assinBy')->orderBy('id','DESC')->get();

        return [ 'status' => true,
            'data' =>  $task,
            'msg' =>  'Get task List.'];
    }
    public function store(Request $request)
    {
        $project_id = $request->input('project_id');
        $task = [
            'title' => $request->title,
            'start_date' => Carbon::createFromDate($request->start_date)->format('Y/m/d'),
            'description' => $request->description,
            'end_date' => Carbon::createFromDate($request->end_date)->format('Y/m/d'),
            'extend_days' => $request->extend_days?1:0,
            'created_by' => $request->user_id,
        ];
        $create = NewTask::create($task);
        if($create){
            if($project_id){
                $task = [
                    'project_id'=>$project_id,
                    'task_id'=> $create->id,
                    'progress'=> 0,
                    'user_id'=>  $request->user_id
                ];
                ProjectTask::create($task);
            }
            if(count($request->sub_task) > 0){
                foreach ($request->sub_task as $subtask){
                    $stask = [
                        'new_task_id' => $create->id,
                        'title' => $subtask,
                        'start_date' => Carbon::createFromDate($request->subtask_start_date)->format('Y/m/d'),
                        'end_date' => Carbon::createFromDate($request->subtask_end_date)->format('Y/m/d'),
                        'created_by' => $request->user_id,
                    ];
                   $subTx =  NewSubTask::create($stask);
                    if($project_id){
                        $st=[
                            'project_id'	=>$project_id,
                            'task_id' => $create->id,
                            'sub_task_id'=>$subTx->id,
                            'progress'=> 0,
                            'user_id' =>  $request->user_id
                        ];
                        ProjectSubTask::create($st);
                    }
                }
            }
            $assign_arr = [];
            foreach ($request->assign_user_id as $assign){
                $tag = [
                    'new_task_id'=>$create->id,
                    'assign_user_id'=>$assign['id']
                ];
                array_push($assign_arr,$tag);
            }
            $create->assignUser()->sync_one_to_many($assign_arr);
            return response()->json(['message' => 'Task Create successfully'],200);
        }else{
            return response()->json(['message' => 'Task Create failed'],400);
        }
    }
    public function update(Request $request,$id)
    {
        $task = [
            'title' => $request->title,
            'start_date' => Carbon::createFromDate($request->start_date)->format('Y/m/d'),
            'description' => $request->description,
            'end_date' => Carbon::createFromDate($request->end_date)->format('Y/m/d'),
            'extend_days' => $request->extend_days?1:0,
            'progress' => $request->progress?$request->progress:0,
            'updated_by' => $request->user_id,
        ];
        $update = NewTask::where('id',$id)->update($task);
        if($update){
             return response()->json(['message' => 'Task Update successfully'],200);
        }else{
             return response()->json(['message' => 'Task Update failed'],400);
        }
    }
    public function assignupdate(Request $request,$id)
    {
        if(count($request->assign_user_id) > 0){
            $update = NewTask::where('id',$id)->first();
            $assign_arr = [];
            foreach ($request->assign_user_id as $assign){
                $tag = [
                    'new_task_id'=>$update->id,
                    'assign_user_id'=>$assign['id']
                ];
                array_push($assign_arr,$tag);
            }
            $update->assignUser()->sync_one_to_many($assign_arr);

            return response()->json(['message' => 'Task Update successfully'],200);
        }else{
            return response()->json(['message' => 'Task Update failed'],400);
        }
    }
    public function statusupdate(Request $request,$id)
    {
        $update = NewTask::where('id',$id)->first();
        $update->status = $request->status;
        $update->updated_by = $request->user_id;
        $update->update();
        return response()->json(['message' => 'Task Status Update successfully'],200);

    }
    public function delete($id)
    {
        NewTask::where('id',$id)->delete();
        ProjectTask::where('task_id',$id)->delete();
        ProjectSubTask::where('task_id',$id)->delete();
        return response()->json(['message' => 'Task Delete successfully'],200);

    }


}

