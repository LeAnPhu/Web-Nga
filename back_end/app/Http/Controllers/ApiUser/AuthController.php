<?php

namespace App\Http\Controllers\ApiUser;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController 
{
    public function register(Request $request)
    {
        $val = Validator::make($request -> all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($val ->fails())
        {
            return response() -> json(['errors'=> $val->errors()]);
        }

        DB::beginTransaction();

        try
        {
            $user = User::create([
                'name' => $request->name,
                'email' => $request -> email,
                'password' => Hash::make($request-> password),
                'role' => 'user',
            ]);

            DB::commit();

            $token = Auth::guard('user') ->login($user);

            Log::info('Người dùng đã được tạo tài khoản thành công'. $user->email);

            return response() ->json([
                'message' => 'Đăng ký tài khoản thành công',
                'user' => $user,
                'token' => $token,
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollback();
            Log::error('Lỗi đăng ký: ' . $e->getMessage());
            return response() -> json(['message' => 'Lỗi khi đăng ký tài khoản ']);
        }
    }
    /**
     * Đăng nhập user
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('user')->attempt($credentials)) {
            Log::warning('Đăng nhập thất bại: ' . $request->email);
            return response()->json(['message' => 'Đăng nhập thất bại'], 401);
        }

        $user = Auth::guard('user')->user();

        Log::info('Người dùng đăng nhập: ' . $request->email);

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user'   => $user,
            'token'   => $token,
            'role' => 'user'
        ]);
    }

    /**
     * Đăng xuất user
     */
    public function logout()
    {
        try {
            $token = JWTAuth::getToken();
            if (!$token) {
                return response()->json(['message' => 'Token không hợp lệ'], 401);
            }

            JWTAuth::invalidate($token); 
            return response()->json(['message' => 'Đăng xuất thành công']);

        } catch (\Exception $e) {
            Log::error('Lỗi đăng xuất: ' . $e->getMessage());
            return response()->json(['message' => 'Lỗi khi đăng xuất'], 500);
        }
    }

}
