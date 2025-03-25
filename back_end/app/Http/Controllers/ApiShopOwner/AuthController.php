<?php

namespace App\Http\Controllers\ApiShopOwner;

use App\Models\ShopOwner;
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
            'email' => 'required|string|email|max:255|unique:shop_owners',
            'password' => 'required|string|min:6',
        ]);

        if($val ->fails())
        {
            return response() -> json(['errors'=> $val->errors()]);
        }

        DB::beginTransaction();

        try
        {
            $shop_owner = ShopOwner::create([
                'name' => $request->name,
                'email' => $request -> email,
                'password' => Hash::make($request-> password),
                'role' => 'shop_owner',
            ]);

            DB::commit();

            $token = Auth::guard('shop_owner') ->login($shop_owner);

            Log::info('Shop đã được tạo tài khoản thành công'. $shop_owner->email);

            return response() ->json([
                'message' => 'Đăng ký tài khoản thành công',
                'shop_owner' => $shop_owner,
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

        if (!$token = Auth::guard('shop_owner')->attempt($credentials)) {
            Log::warning('Đăng nhập thất bại: ' . $request->email);
            return response()->json(['message' => 'Đăng nhập thất bại'], 401);
        }

        $shop_owner = Auth::guard('shop_owner')->user();

        Log::info('Shop đăng nhập: ' . $request->email);

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'shop_owner'   => $shop_owner,
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

}
