<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectTask;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use Illuminate\Support\Facades\DB;
 use Illuminate\Support\Facades\URL;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{

//customer task

public function owntask($user_id){
    $customer = User::find($user_id);
    // Retrieve projects based on the user_id
        $projects = Project::where('project_assign_user_id', $user_id)->get();

        // Retrieve project tasks based on the projects
        $projectIds = $projects->pluck('id');
        $projectTasks = ProjectTask::whereIn('project_id', $projectIds)->get();
  //dd($projectTasks);
        // Retrieve subtasks based on the project tasks


        // Prepare the JSON response
        $data = [];

        // Add tasks and their subtasks to the JSON response
        foreach ($projects as $task) {
            $dependencies = !empty($task->dependencies) ? explode(',', $task->dependencies) : [];

            // Add projects to the JSON response

            $taskData = [
                'type' => 'project',
                'id' => $task->id,
                'name' => $task->project_name,
                'start' => Carbon::createFromDate($task->project_startdate)->format('Y/m/d'),
                'end' => Carbon::createFromDate($task->project_enddate)->format('Y/m/d'),
                'progress' => $task->progress??50,
                'hideChildren' => false,
            ];


            // Add the task to the JSON response
            $data[] = $taskData;

            // Find the subtasks of the task
            //$taskSubtasks = $subtasks;
//dd($taskSubtasks);
            // Add subtasks of the task to the JSON response

      $subtaskoftask = DB::table('projects_task')
    ->where('project_id', $task->id)
    ->get();
        //dd($subtaskoftask);
            foreach ($subtaskoftask as $subtask) {
                $subtaskData = [
                    'type' => 'task',
                    'id' => $subtask->id,
                    'name' => $subtask->subtask_name,
                    'start' => Carbon::createFromDate($subtask->subtask_startdate)->format('Y/m/d'),
                    'end' => Carbon::createFromDate($subtask->subtask_enddate)->format('Y/m/d'),
                    'progress' => $subtask->progress ?? 50,
                    'dependencies' => [],
                    'project' => $subtask->project_id,
                ];

                // Add the subtask to the JSON response
                $data[] = $subtaskData;
            }
            $subtaskData = '';
        }



        // Return the JSON response
        return response()->json($data);

}

    //get dingle customer
    public function getcustomer($id){
        $customer = User::find($id);

        return [ 'status' => true,
        'data' =>  $customer,
        'msg' =>  'customer get successfully.'];

    }
    // add customer

    public function store(Request $request)
    {
        //return $request->all();
       // dd();
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'customer_phone' => 'required',
            'customer_company_name' => 'required',
            'customer_forecast' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $customer = new Customer;

    $customer->customer_name = $request->customer_name;
    $customer->customer_pic = $request->customer_pic;
    $customer->customer_email = $request->customer_email;
    $customer->customer_phone = $request->customer_phone;
    $customer->customer_company_name = $request->customer_company_name;
    $customer->customer_forecast = $request->customer_forecast;
    $customer->email_verified_at = $request->email_verified_at;
    $customer->recent_activity = $request->recent_activity;
    $customer->user_id = $request->user_id;

    $customer->save();


            $success['name'] =  $request->customer_name;
            $success['id'] =  $customer->id;
        return [ 'status' => true,
           'data' =>  $success,
           'msg' =>  'customer register successfully.'];

    }






public function index($user_id)
{
 /*   $user = User::find($user_id);

    if (!$user) {
        abort(401, 'Unauthenticated.');
    }

    $baseUrl = URL::to('/');

    if ($user->role === 'Administrador') {
        $users = User::where('role', 'Cliente')
            ->orWhere('role', 'Digitador')
            ->orWhere('role', 'Supervisor')

            ->get();

    } elseif ($user->role === 'Digitador' OR $user->role === 'Supervisor' ) {
        $users = User::where('role', 'Cliente')
            ->where('added_by', $user_id)
            ->get();
    } else {
        abort(403, 'Unauthorized action.');
    }

    // Modify the user_pic attribute to prepend with the base URL
    foreach ($users as $user) {
        if (empty($user->user_pic)) {
       $user->user_pic =  $user->user_pic = '';
    } else {
       $user->user_pic =  $user->user_pic = $baseUrl . '/' . $user->user_pic;
    }

    }

    return [
        'status' => true,
        'data' => $users,
        'msg' => 'Users retrieved successfully.',
    ];
    */

    $users = Customer::get();
     return [
        'status' => true,
        'data' => $users,
        'msg' => 'Users retrieved successfully.',
    ];


}





    public function show(Customer $customer)
    {
        return view('customers.show', compact('customer'));
    }

    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'customer_name' => 'required',
            'customer_email' => 'required|email',
            'customer_phone' => 'required',
            'customer_company_name' => 'required',
            'customer_forecast' => 'required',
            'user_id' => 'required',
        ]);

     $customer->customer_name = $request->customer_name;
    $customer->customer_pic = $request->customer_pic;
    $customer->customer_email = $request->customer_email;
    $customer->customer_phone = $request->customer_phone;
    $customer->customer_company_name = $request->customer_company_name;
    $customer->customer_forecast = $request->customer_forecast;
    $customer->email_verified_at = $request->email_verified_at;
    $customer->recent_activity = $request->recent_activity;
    $customer->user_id = $request->user_id;

        $customer->update($request->all());

        $success['name'] =  $request->customer_name;

        return [ 'status' => true,
           'data' =>  $success,
           'msg' =>  'customer updated successfully.'];
    }


    public function deleteCustomer($id)
{
    $customer = Customer::find($id);

    if (!$customer) {
        return response()->json([
            'error' => 'Customer not found.'
        ], 404);
    }

    $customer->delete();

    return response()->json([
        'message' => 'Customer deleted successfully.'
    ], 200);
}
}
