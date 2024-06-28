<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectSubTask;
use Illuminate\Http\Request;
use App\Models\ProjectTask;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\MailHistory;
class ProjectTaskController extends Controller
{
public function gettaskhistory($task_id)
{
    // Retrieve the data from the mail_history table based on subtask_id
    $taskHistory = DB::table('mail_history')
        ->where('task_id', $task_id)
        ->get();
    // Decode the user_list field in each record
    foreach ($taskHistory as $record) {
        $record->user_list = json_decode($record->user_list);
        if(empty( $record->user_list)){
             $record->user_list = [];
        }
    }
    // Return the data as JSON response
    return response()->json($taskHistory);
}
public function getsubtaskhistory($task_id)
{
    // Retrieve the data from the mail_history table based on subtask_id
    $taskHistory = DB::table('mail_history')
        ->where('subtask_id', $task_id)
        ->get();

    // Decode the user_list field in each record
    foreach ($taskHistory as $record) {
        $record->user_list = json_decode($record->user_list);
        if(empty( $record->user_list)){
             $record->user_list = [];
        }
    }

    // Return the data as JSON response
    return response()->json($taskHistory);
}






public function sendmail(Request $request)
{
    // Get the JSON data from the request
        $jsonData = $request->all();
        // Extract the relevant fields
        $taskId = $jsonData['task_id'];
        $subtask_id = $request->subtask_id?$request->subtask_id:0;
        $project_id = $jsonData['project_id'];
        $userList = $jsonData['assign_user_id'];
        $subtaskStatus = $jsonData['status'];
        $description = $jsonData['description'];
        $userId = $jsonData['user_id'];

        $projectfinal = Project::find($project_id);


    // Handle the uploaded file
    if ($request->file('upload_file')) {
        $uploadedFile = $request->file('upload_file');
        $fileExtension = $uploadedFile->getClientOriginalExtension();
        $filePath = 'uploads/' . time() . '.' . $fileExtension;
        $uploadedFile->move(public_path('uploads'), $filePath);
    } else {
        $filePath = 'demo.jpg';
    }
    // Insert the data into the mail_history table
    DB::table('mail_history')->insert([
        'project_id' => $project_id,
        'task_id' => $taskId,
        'subtask_id' => $subtask_id,
        'user_list' => $userList,
        'status' => $subtaskStatus,
        'description' => $description,
        'user_id' => $userId,
        'upload_file' => $filePath
    ]);
    // Send email to all customers
    $customerEmails = [];
    $users = json_decode($userList, true);

    foreach ($users as $user) {
        $notificationId = DB::table('notifications')->insertGetId([
            'noti_title' => 'Actualizaciones de tareas',
            'noti_desc' => $jsonData['description'],
            'user_id' => $user['id']
        ]);
        $customerId = $user['id'];
        $customer = User::find($customerId);
        if ($customer) {
            $customerEmails[] = $customer->email;
        }
    }

    foreach ($customerEmails as $email) {
       $mailHis = MailHistory::where('task_id', $taskId)
        ->orderBy('id', 'desc')
        ->first();
        $task_list = ProjectTask::with('taskName')->where(['project_id'=>$mailHis->project_id, 'task_id'=>$mailHis->task_id])->first();
        $subtask_list='';
        if($mailHis->subtask_id){
            $subtask_list =  ProjectSubTask::with('subTaskName')->where(['project_id'=>$mailHis->project_id, 'task_id'=>$mailHis->task_id,'sub_task_id'=>$mailHis->subtask_id])->first();
        }

        if ($mailHis) {
            $filePath = base_path('public/' . $mailHis->upload_file);
            Mail::send('emails.mailTemplate',[
                'Project_name' => $projectfinal->project_name,
                'task' => $task_list->taskName->title,
                'subtask' => $subtask_list?$subtask_list->subTaskName->title:'',
                'task_status' => $mailHis->status,
                'description' => $mailHis->description,
            ], function ($message) use ($email, $mailHis, $filePath) {
                $message->to($email)->subject('CRM Task Notification');

                if (!empty($filePath) && file_exists($filePath)) {
                    $message->attach($filePath);
                }else{
                     return response()->json(['message' => 'Emails not successfully']);
                }
            });
        }

    }

    // Return a response or perform any additional operations as needed
    return response()->json(['message' => 'Emails sent successfully']);
}





    public function gettask($id){
        $customer = ProjectTask::find($id);

        return [ 'status' => true,
        'data' =>  $customer,
        'msg' =>  'Get Project.'];

    }

    public function index(Request $request, $projectId)
    {
        $tasks = ProjectTask::where('project_id', $projectId)->get();
        return response()->json(['tasks' => $tasks,'msg' => 'LIst of all subtask']);
    }

    public function store(Request $request, $projectId)
    {
        // print_r($request->all());
        // dd();
        $task = new ProjectTask($request->all());
        $task->project_id = $projectId;

        if(!empty($request->task_id)){
          $task->project_type = "subtask";
          $task->task_id = $request->task_id;
        }else{
             $task->project_type = "task";
        }
        $task->save();

        $taskId = $task->id;
         $mytime = Carbon\Carbon::now();
         $mytime->toDateTimeString();
        return response()->json(['task' => $task,'msg' => 'Subtask Added Successfully']);
    }

    public function update(Request $request,  $taskId)
    {
        // print_r($request->all());
        // dd();
        $task = ProjectTask::findOrFail($taskId);
        $task->update($request->all());

        $mytime = Carbon\Carbon::now();
 $mytime->toDateTimeString();


DB::table('task')
    ->where('subtask_id', $taskId)
    ->update([
        'name' => $request->input('subtask_name'),
        'start' => $request->input('subtask_startdate'),
        'end' => $request->input('subtask_enddate'),
        'parent_id' => 0,
        'ordinal' => 0,
        'ordinal_priority' => $mytime->toDateTimeString(),
        'user_id' => $request->input('user_id'),
    ]);


        return response()->json(['task' => $task,'msg' => 'Subtask Update Successfully']);
    }

    public function destroy(Request $request, $taskId)
    {
        //dd($request);
        $task = ProjectTask::findOrFail($taskId);
        $task->delete();


        return response()->json(['task' => [],'msg' => 'Subtask Delete Successfully']);
    }
}

