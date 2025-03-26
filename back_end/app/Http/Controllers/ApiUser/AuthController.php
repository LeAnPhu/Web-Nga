<?php

namespace App\Http\Controllers\ApiUser;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController 
{
    const setTimeExpiry = 2;
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

        //OTP
        $otp = (string) rand(100000,999999);
        $otp_expired =  Carbon::now() -> addMinutes(static::setTimeExpiry);

        try
        {
            $user = User::create([
                'name' => $request->name,
                'email' => $request -> email,
                'password' => Hash::make($request-> password),
                'role' => 'user',
                'otp' => $otp,
                'otp_expired' => $otp_expired,
            ]);

            DB::commit();

            $token = Auth::guard('user') ->login($user);

            Log::info('Người dùng đã được tạo tài khoản thành công'. $user->email);

            return response() ->json([
                'message' => 'Đăng ký tài khoản thành công',
                'user' => $user,
                'token' => $token,
                'otp' => $otp,
                'otp_expired' => $otp_expired,
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollback();
            Log::error('Lỗi đăng ký: ' . $e->getMessage());
            return response() -> json(['message' => 'Lỗi khi đăng ký tài khoản ']);
        }
    }

    // Tạo lại OTP khi hết time
    public function re_register(Request $request)
        {
        
            $val = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',  
            ]);

            if ($val->fails()) {
                return response()->json($val->errors()->toJson(), 400);
            }

        
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([  
                    'message' => 'Không tìm thấy người dùng với email này.',
                ], 404);  
            }

            if ($user->confirm == true) {
                return response()->json([ 
                    'message' => 'Email này đã được xác thực. Bạn không thể gửi lại OTP.',
                ], 400);
            }

            
            $user->otp = (string) rand(100000, 999999); 
            $user->otp_expired= Carbon::now()->addMinutes(static::setTimeExpiry);  
            $user->save();

            
            if (!$user->otp || !$user->otp_expired) {
                return response()->json([  
                    'message' => 'Không thể tạo mã xác thực hoặc thời gian hết hạn.',
                ], 500);  
            }
        }

    // Xác thực
    public function verifyOTP(Request $request)
    {
    
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6', 
        ]);


        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Tài khoản không tồn tại'], 404);
        }


        if (Carbon::now()->gt($user->otp_expired)) {
            return response()->json(['message' => 'Hết hạn xác thực'], 400);
        }

    
        if ((string)$user->otp !== (string)$request->otp) {
            return response()->json(['message' => 'Mã xác thực không chính xác'], 400);
        }

        $user->otp_expired = null;
        $user->confirm = true;
        $user->email_verified_at = Carbon::now();
        $user->save();

        return response()->json(['message' => 'Xác thực tài khoản thành công']);
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

        $user = User::where('email', $request -> email) ->first();

        if(!$user)
        {
            return response()-> json(['message' => 'Tài khoản không tồn tại']);
        }

        if($user -> confirm == false)
        {
            return response() -> json(['message' => 'Tài khoản chưa xác thực']);
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
