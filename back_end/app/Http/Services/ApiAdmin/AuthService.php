<?php

namespace App\Services\ApiAdmin;

namespace App\Services;

use App\Http\Repositories\AdminRepository;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AdminAuthService
{
    protected $adminRepository;

    public function __construct(AdminRepository $adminRepository)
    {
        $this->adminRepository = $adminRepository;
    }

    public function register(array $data)
    {
        $admin = $this->adminRepository->create($data);
        $token = JWTAuth::fromUser($admin);

        return [
            'message' => 'Admin registered successfully',
            'token' => $token
        ];
    }

    public function login(array $data)
    {
        $admin = $this->adminRepository->findByEmail($data['email']);

        if (!$admin || !Hash::check($data['password'], $admin->password)) {
            throw new \Exception('Invalid credentials', 401);
        }

        $token = JWTAuth::fromUser($admin);

        return [
            'message' => 'Login successful',
            'token' => $token,
        ];
    }

    public function logout()
    {
        $token = JWTAuth::getToken();
        JWTAuth::invalidate($token);

        return [
            'message' => 'Logout successful',
        ];
    }
}
