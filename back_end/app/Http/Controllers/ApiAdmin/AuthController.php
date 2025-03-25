<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController
{
    /**
     * Đăng ký tài khoản admin
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            // Tạo tài khoản admin
            $admin = Admin::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'admin',
            ]);

            DB::commit();

            // Tạo JWT token
            $token = Auth::guard('admin')->login($admin);

            Log::info('Admin đăng ký thành công: ' . $admin->email);

            return response()->json([
                'message' => 'Đăng ký tài khoản thành công',
                'admin'   => $admin,
                'token'   => $token
            ], 200);

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Lỗi đăng ký: ' . $e->getMessage());

            return response()->json(['message' => 'Lỗi khi đăng ký tài khoản'], 500);
        }
    }

    /**
     * Đăng nhập admin
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

        if (!$token = Auth::guard('admin')->attempt($credentials)) {
            Log::warning('Đăng nhập thất bại: ' . $request->email);
            return response()->json(['message' => 'Đăng nhập thất bại'], 401);
        }

        $admin = Auth::guard('admin')->user();

        Log::info('Admin đăng nhập: ' . $request->email);

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'admin'   => $admin,
            'token'   => $token
        ]);
    }

    /**
     * Đăng xuất admin
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

    /**
     * Lấy thông tin admin
     */
    public function profile()
    {
        return response()->json(Auth::guard('admin')->user());
    }
}
