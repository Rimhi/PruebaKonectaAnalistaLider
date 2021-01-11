<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;
use Illuminate\Support\Facades\Hash;
class TokensController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('email','password');

        $validator = Validator::make($credentials,[
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Wrong validation',
                'errors' => $validator->errors()
            ],422);
        }
        $token = JWTAuth::attempt($credentials);
        if($token){
            return response()->json([
                'success' => true,
                'message' => 'Login Exitoso',
                'token' => $token,
                'user' => User::where('email',$credentials['email'])->get()->first(),
            ],200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Usuario o Contraseña son invalidos',
                'errors' => $validator->errors()
            ],200);
        }
        return null;
    }
    public function refreshToken(){
        $token = JWTAuth::getToken();

        try {
            $token = JWTAuth::refresh($token);
            return response()->json(['success' => true, 'token' => $token], 200);
        } catch (TokenExpiredException $ex) {
            // We were unable to refresh the token, our user needs to login again
            return response()->json([
                'code' => 3, 'success' => false, 'message' => 'Need to login again, please (expired)!'
            ]);
        } catch (TokenBlacklistedException $ex) {
            // Blacklisted token
            return response()->json([
                'code' => 4, 'success' => false, 'message' => 'Need to login again, please (blacklisted)!'
            ], 422);
        }

    }
    public function logout()
    {
        //  $this->validate($request, ['token' => 'required']);
        $token = JWTAuth::getToken();

        try {
            $token = JWTAuth::invalidate($token);
            return response()->json([
                'success' => true, 'message' => "You have successfully logged out."
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false, 'message' => 'Failed to logout, please try again.'
            ], 422);
        }

    }
    public function getUser(){
        return response()->json([
            'success' => true,
            'user' => JWTAuth::parseToken()->authenticate(),
        ], 200);
    }
    public function register(Request $request){
        $credentials = $request->only('email','password','number','name');
        
        $validator = Validator::make($credentials, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'number' => ['required', 'integer', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Email o numero ya existen',
                'errors' => $validator->errors()
            ],422);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->number = $request->number;
        $user->password = Hash::make($request->password);
        $user->save();
        $credentials = request(['email', 'password']);
        $token = JWTAuth::attempt($credentials);
        if($token){
            return response()->json([
                'success' => true,
                'message' => 'Login Exitoso',
                'token' => $token,
                'user' => $user,
            ],200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Usuario o Contraseña son invalidos',
                'errors' => $validator->errors()
            ],200);
        }
        return null;
    }
}
