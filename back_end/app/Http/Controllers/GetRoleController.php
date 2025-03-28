<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ShopOwner;
use App\Models\Admin;

class GetRoleController extends Controller
{
    public function getRoleByEmail(Request $request)
    {
        $email = $request->input('email');
    
        if (Admin::where('email', $email)->exists()) {
            return response()->json(['role' => 'admin']);
        }
    
        if (ShopOwner::where('email', $email)->exists()) {
            return response()->json(['role' => 'shop_owner']);
        }
    
        if (User::where('email', $email)->exists()) {
            return response()->json(['role' => 'user']);
        }
    
        return response()->json(['error' => 'Email không tồn tại trong hệ thống'], 404);
    }
    
}
