<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Password;
use Validator;

class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {

        //dd($request);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'phone' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            //dd($existingUser);
            return response()->json(['error' => 'el Email ya existe'], 400);
        }

        $input = $request->all();

        if ($request->hasFile('user_pic')) { // save user picture if it's uploaded
            $user_pic = $request->file('user_pic');
            $user_pic_name = time() . $user_pic->getClientOriginalName();
            $user_pic->move(public_path('uploads/user_pics'), $user_pic_name);
            $input['user_pic'] = $user_pic_name;
        }

        $input['password'] = Hash::make($input['password']);
        $input['role'] = $request->role;
        $input['phone'] = $request->phone;

        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;
        $success['user_pic'] = $user->user_pic; // added user_pic to success response
        $success['role'] = $user->role; // added role to success response

        $success['phone'] = $user->phone;
        $success['added_by'] = $user->added_by; // added added_by to success response

        $notificationData = [
            'noti_title' => 'Nuevo usuario Registrarse',
            'noti_desc' => 'Nuevo usuario Registrarse' . $user->name,
            'user_id' => '1',
        ];

        DB::table('notifications')->insert($notificationData);

        return $this->sendResponse($success, 'Registro de usuario con éxito.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $baseUrl = URL::to('/');
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['user_id'] = $user->id;
            $success['name'] = $user->name;
            $success['email'] = $user->email;
            $success['role'] = $user->role;

            if (empty($user->user_pic)) {
                $success['user_pic'] = '';
            } else {
                $success['user_pic'] = $baseUrl . '/' . $user->user_pic;
            }

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }

    public function resetPassword(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        //return $this->sendResponse($request->all(),"e123456rror");

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->sendError("", 'Email not Exist');
        }
        if (!$user->password_reset_token || !$user->password_reset_sent_at) {
            return $this->sendError("", 'Invalid or expired token');
        }
    
        if (now() > $user->password_reset_expires_at) {
            return $this->sendError("", 'Token has expired');
        }

        $user->password = Hash::make($request->password);
        $user->password_reset_token = null;
        $user->password_reset_sent_at = null;
        $user->password_reset_expires_at = null;
        $user->save();


        return $this->sendResponse($user, 'Your password has been reset!');

    }
    public function forgetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return $this->sendError("", 'Account not found');
        }

        // Generate a unique token for the password reset link
        $token = Str::random(64);

        $expirationTime = now()->addHours(1); // Token expires in 24 hours
        
        $user->password_reset_token = $token;
        $user->password_reset_sent_at = now();
        $user->password_reset_expires_at = $expirationTime;
        $user->save();

        try {
            Mail::to($user->email)->send(new PasswordResetMail($user, $token));
        } catch (\Throwable $throwable) {
            return $this->sendError("", "error sending email");
        }

        return $this->sendResponse($user, 'Password reset email sent!' );
    }

}
