<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
{
    use HasFactory, HasApiTokens;

    protected $table = 'admins';   
    protected $primaryKey = 'id';  
    protected $fillable = [
        'role',
        'name',
        'email',
        'password',
        'image',
        'isActive',
    ];

    protected $hidden = [
        'password',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role, 
        ];
    }
}
