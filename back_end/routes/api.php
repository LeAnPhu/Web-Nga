<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAdmin\AuthController;
use App\Http\Controllers\ApiShopOwner\AuthController as AuthShop ;

Route::prefix('admin')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['jwt.auth', 'role:admin'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to Admin Dashboard']);
        });
        Route::get('/profile', [AuthController::class, 'profile']);
    });
});



Route::prefix('shop')->group(function () {
    Route::post('/register', [AuthShop::class, 'register']);
    Route::post('/login', [AuthShop::class, 'login']);

    Route::middleware(['jwt.auth', 'role:shop_owner'])->group(function () {
        Route::post('/logout', [AuthShop::class, 'logout']);
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Welcome to Admin Dashboard']);
        });
        Route::get('/profile', [AuthShop::class, 'profile']);
    });
});
