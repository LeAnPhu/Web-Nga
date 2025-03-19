<?php

namespace App\Http\Repositories\ApiAdmin;

use App\Models\User;

class AdminRepository
{
    public function findByEmail($email)
    {
        return User::where('email', $email)->where('role', 'admin')->first();
    }

    public function create(array $data)
    {
        return User::create($data);
    }
}
