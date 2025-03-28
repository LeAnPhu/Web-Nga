<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAdmin\AuthController;
use App\Http\Controllers\ApiShopOwner\AuthController as AuthShop;
use App\Http\Controllers\ApiUser\AuthController as AuthUser;
use App\Http\Controllers\GetRoleController;

Route::post('/get-role', [GetRoleController::class, 'getRoleByEmail']);

// Route đăng nhập & đăng ký
Route::prefix('admin')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify', [AuthController::class, 'verifyOTP']);

    Route::middleware(['jwt.auth', 'role:admin'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to Admin Dashboard']);
        });
        Route::get('/profile', [AuthController::class, 'profile']);
    });
});

Route::prefix('shop_owner')->group(function () {
    Route::post('/register', [AuthShop::class, 'register']);
    Route::post('/re-register', [AuthShop::class, 're_register']); 
    Route::post('/verify', [AuthShop::class, 'verifyOTP']);
    Route::post('/login', [AuthShop::class, 'login']);
    Route::post('/forgot-password', [AuthShop::class, 'forgotPassword']); 
    Route::post('/reset-password', [AuthShop::class, 'resetPassword']);   

    Route::middleware(['jwt.auth', 'role:shop_owner'])->group(function () {
        Route::post('/logout', [AuthShop::class, 'logout']);
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to Shop Owner Dashboard']);
        });
        Route::get('/profile', [AuthShop::class, 'profile']);
    });
});

Route::prefix('user')->group(function () {
    Route::post('/register', [AuthUser::class, 'register']);
    Route::post('/re-register', [AuthUser::class, 're_register']); 
    Route::post('/verify', [AuthUser::class, 'verifyOTP']);
    Route::post('/login', [AuthUser::class, 'login']);
    Route::post('/forgot-password', [AuthUser::class, 'forgotPassword']); 
    Route::post('/reset-password', [AuthUser::class, 'resetPassword']);   

    Route::middleware(['jwt.auth', 'role:user'])->group(function () {
        Route::post('/logout', [AuthUser::class, 'logout']);
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to User Dashboard']);
        });
        Route::get('/profile', [AuthUser::class, 'profile']);
    });
});