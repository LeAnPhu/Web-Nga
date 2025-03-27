<?php

namespace App\Http\Controllers\ApiShopOwner;

use App\Models\ShopOwner;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use App\Mail\OTPMail;


class AuthController 
{
    const setTimeExpiry = 2;
    public function register(Request $request)
    {
        $val = Validator::make($request -> all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:shop_owners',
            'password' => 'required|string|min:6',
        ]);

        if($val ->fails())
        {
            return response() -> json(['errors'=> $val->errors()]);
        }

        DB::beginTransaction();

        //OTP
        $otp = (string) rand(100000,999999);
        $otp_expired = Carbon::now() -> addMinutes(static::setTimeExpiry);

        try
        {
            $shop_owner = ShopOwner::create([
                'name' => $request->name,
                'email' => $request -> email,
                'password' => Hash::make($request-> password),
                'role' => 'shop_owner',
                'confirm' => false,
                'otp' => $otp,
                'otp_expired' => $otp_expired,
            ]);

            DB::commit();
            Mail::to($shop_owner->email)->send(new OTPMail($otp, $shop_owner, 'shop_owner'));
            $token = Auth::guard('shop_owner') ->login($shop_owner);

            Log::info('Shop đã được tạo tài khoản thành công'. $shop_owner->email);

            return response() ->json([
                'message' => 'Đăng ký tài khoản thành công',
                'shop_owner' => $shop_owner,
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

    public function re_register(Request $request)
        {
        
            $val = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',  
            ]);

            if ($val->fails()) {
                return response()->json($val->errors()->toJson(), 400);
            }

        
            $shop_owner = ShopOwner::where('email', $request->email)->first();

            if (!$shop_owner) {
                return response()->json([  
                    'message' => 'Không tìm thấy người dùng với email này.',
                ], 404);  
            }

            if ($shop_owner->confirm == true) {
                return response()->json([ 
                    'message' => 'Email này đã được xác thực. Bạn không thể gửi lại OTP.',
                ], 400);
            }

            
            $shop_owner->otp = (string) rand(100000, 999999); 
            $shop_owner->otp_expired= Carbon::now()->addMinutes(static::setTimeExpiry);  
            $shop_owner->save();
            dd($shop_owner);

            if (!$shop_owner->otp || !$shop_owner->otp_expired) {
                return response()->json([  
                    'message' => 'Không thể tạo mã xác thực hoặc thời gian hết hạn.',
                ], 500);  
            }
        }

    // Xác thực OTP
    public function verifyOTP(Request $request)
    {
    
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6', 
        ]);


        $shop_owner = ShopOwner::where('email', $request->email)->first();

        if (!$shop_owner) {
            return response()->json(['message' => 'Tài khoản không tồn tại'], 404);
        }


        if (Carbon::now()->gt($shop_owner->otp_expired)) {
            return response()->json(['message' => 'Hết hạn xác thực'], 400);
        }

    
        if ((string)$shop_owner->otp !== (string)$request->otp) {
            return response()->json(['message' => 'Mã xác thực không chính xác'], 400);
        }

        //Luu trang thai sau xac thuc
        $shop_owner->otp = 0;
        $shop_owner->otp_expired = null;
        $shop_owner->confirm = true;
        $shop_owner->email_verified_at = Carbon::now();
        $shop_owner->save();

        return response()->json(['message' => 'Xác thực tài khoản thành công']);
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

        $shop_owner = ShopOwner::where('email', $request->email)->first();

        if(!$shop_owner)
        {
            return response() -> json(['message' => 'Tài khoản không tồn tại']);
        }

        
        if($shop_owner-> confirm == false)
        {
            return response() -> json(['message' => 'Tài khoản chưa xác thực']);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('shop_owner')->attempt($credentials)) {
            Log::warning('Đăng nhập thất bại: ' . $request->email);
            return response()->json(['message' => 'Đăng nhập thất bại'], 401);
        }

        $shop_owner = Auth::guard('shop_owner')->user();

        Log::info('Shop đăng nhập: ' . $request->email);

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'shop_owner'   => $shop_owner,
            'token'   => $token,
            'role' => 'shop_owner'
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

}
