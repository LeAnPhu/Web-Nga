<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
      
        if (Auth::check()) {
            if (in_array(Auth::user()->role, $roles)) {
                return $next($request);
            } else {
                return response()->json([
                    'message' => 'Bạn không được phép truy cập.'
                ], 403);
            }
        }

        return response()->json([
            'message' => 'Hãy đăng nhập vào web.'
        ], 401);
    }
}
