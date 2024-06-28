<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\ProjectTaskController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\NewTaskController;
use App\Http\Controllers\API\NewSubTaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('password/reset', 'resetPassword');
    Route::post('password/forget', 'forgetPassword');
});

Route::middleware('auth:sanctum')->group( function () {
    Route::resource('products', ProductController::class);


});

Route::controller(CustomerController::class)->group(function(){
    Route::get('customerlist/{user_id}', 'index');
    Route::get('customertask/{user_id}', 'owntask');
    Route::post('addcustomer', 'store');
    Route::post('editcustomer/{customer}', 'update');
    Route::get('customer/{id}', 'getcustomer');
    Route::get('deletecustomer/{customer}', 'deleteCustomer');

});

Route::controller(ProjectController::class)->group(function () {
    Route::get('alltasklist/{id}' , 'tasklistall');
    Route::get('projects/{id}', 'listProjects');
    Route::post('projects', 'addProject');
//    Route::get('projects/{id}', 'getproject');
    Route::post('editproject/{id}', 'editProject');
    Route::post('project-assign-update/{id}', 'projectAssignUser');
    Route::post('project-status-update/{id}', 'projectStatus');
    Route::post('editproject/{id}', 'editProject');
    Route::get('deleteprojects/{id}', 'deleteProject');
});

Route::controller(ProjectTaskController::class)->group(function() {
    Route::get('projects/{projectId}/tasks', 'index');
    Route::post('projects/{projectId}/addtasks', 'store');
//    Route::get('task/{taskId}', 'gettask');
    Route::post('edittask/{taskId}', 'update');
    Route::post('deletetask/{taskId}', 'destroy');
    Route::post('sendmail', 'sendmail');
    Route::get('gettaskhistory/{taskId}' , 'gettaskhistory');
    Route::get('getsubtaskhistory/{taskId}' , 'getsubtaskhistory');
});

Route::controller(DashboardController::class)->group(function() {

    Route::get('dashboard/{user_id}', 'index');
    Route::get('notification/{user_id}', 'notification');
    //Route::get('celender/{user_id}', 'index');
    Route::get('calendar/{user_id}', 'showTasksByMonth');
     Route::get('ganttchart/{user_id}', 'showGanttChart');

});

Route::prefix('users')->group(function () {

    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/edituser/{id}', [UserController::class, 'update']);
    //Route::delete('/deleteuser/{id}', [UserController::class, 'destroy']);
    // Define the POST route to delete a user
Route::match(['post', 'delete'], '/deleteuser/{id}', [UserController::class, 'destroy']);

// Define the DELETE route to delete a user
//Route::delete('/deleteuser/{id}', [UserController::class, 'destroy']);

});


//===========New Task Route Hare=============
Route::prefix('task')->group(function () {
    Route::get('/list', [NewTaskController::class, 'index']);
    Route::post('/store', [NewTaskController::class, 'store']);
    Route::post('/update/{id}', [NewTaskController::class, 'update']);
    Route::post('/assign-update/{id}', [NewTaskController::class, 'assignupdate']);
    Route::post('/status-update/{id}', [NewTaskController::class, 'statusupdate']);
    Route::get('/delete/{id}', [NewTaskController::class, 'delete']);
});
//===========New Task Route Hare=============
Route::prefix('sub-task')->group(function () {
    Route::post('/store', [NewSubTaskController::class, 'store']);
    Route::post('/update/{id}', [NewSubTaskController::class, 'update']);
    Route::post('/assign-update/{id}', [NewSubTaskController::class, 'assignupdate']);
    Route::post('/status-update/{id}', [NewSubTaskController::class, 'statusupdate']);
    Route::get('/delete/{id}', [NewSubTaskController::class, 'delete']);
});
