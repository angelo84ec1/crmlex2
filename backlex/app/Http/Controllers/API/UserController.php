<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use  Password;  
use Hash;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
  public function index()
{
    $users = User::all(['id', 'name', 'user_pic', 'email', 'phone', 'email_verified_at', 'role', 'added_by', 'company_name', 'created_at', 'updated_at']);

    // Mapping the user picture URL
    $users = $users->map(function ($user) {
    if (empty($user->user_pic)) {
        $user->user_pic = '';
    } else {
        $user->user_pic = asset($user->user_pic);
    }
    return $user;
});


    return response()->json($users);
}



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
    //dd($request);
    // Check if the email already exists in the database
    $existingUser = User::where('email', $request->email)->first();
    if ($existingUser) {
        //dd($existingUser);
        return response()->json(['error' => 'el Email ya existe'], 400);
    }

    // Create the new user
    $user = new User();
    $user->name = $request->name;
    // Upload the user picture
    if($request->hasFile('user_pic')){
    
      ////////////////////////////////
      $userPic = $request->file('user_pic');
      $fileName = time() . '_' . $userPic->getClientOriginalName();
      $folderPath = 'user_pics';
      $databaseFilePath = $folderPath . '/' . $fileName;
      
      // Store the file with the generated name in the folder
      $userPic->move($folderPath, $fileName);
      //////////////////////////////////////////////////
    

    $user->user_pic = $databaseFilePath;
    $user->email = $request->email;
    $user->phone = $request->phone;
    $user->password = Hash::make($request->password);
    $user->role = $request->role;
    $user->added_by = $request->added_by;
    $user->company_name = $request->company_name;
    $user->save();


    // Concatenate the user_pic with the URL
    $user->user_pic = url($user->user_pic);
    return response()->json(['message' => 'User created successfully', 'user' => $user], 201);


    }else{
       // return response()->json(['error' => 'imagen no disponible '], 400);
        $user->user_pic = "";
    $user->email = $request->email;
    $user->phone = $request->phone;
    $user->password = Hash::make($request->password);
    $user->role = $request->role;
    $user->added_by = $request->added_by;
    $user->company_name = $request->company_name;
    $user->save();
     return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }
    
    
}


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    // public function show(User $user)
    // {
    //     return response()->json($user);
    // }
    public function show($user){
        $userthis = User::find($user);

        return [ 'status' => true,
        'data' =>  $userthis,
        'msg' =>  'customer get successfully.'];

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user_id)
{
    try {
        $user = User::findOrFail($user_id);
        
        $user->email = $request->input('email');
        $user->name = $request->input('name');
        $user->phone = $request->input('phone');
        $user->role = $request->input('role');
        $user->added_by = $request->input('added_by');
        $user->company_name = $request->input('company_name');

        if ($request->hasFile('user_pic')) {
           $userPic = $request->file('user_pic'); // Get the uploaded file

    // Generate a unique name for the file
    $fileName = time() . '_' . $userPic->getClientOriginalName();

    // Specify the storage folder path
    $folderPath = 'user_pics';

    // Store the file with the generated name in the folder
    $userPic->move($folderPath, $fileName);

    // Store the file name in the database
    $databaseFileName = $fileName;
    // Save $databaseFileName in the appropriate field of your database table

    // Alternatively, you can store the complete file path in the database
    $databaseFilePath = $folderPath . '/' . $fileName;
    // Save $databaseFilePath in the appropriate field of your database table
            $user->user_pic = $databaseFilePath;
        }else{
              $user->user_pic = "";
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();
        $user->user_pic = asset($user->user_pic);
    } catch (\Exception $e) {
        return response([
            'status' => false,
            'msg' => 'An error occurred while updating the user.',
            'error' => $e->getMessage()
        ], 500);
    }

    return response([
        'status' => true,
        'data' => $user,
        'msg' => 'User updated successfully.'
    ]);
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
{
    $user = User::find($id);
   // dd($user);
    
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    $user->delete();
     return ['status' => true,
        
        'msg' => 'user deleted successfully.'];
}

}
