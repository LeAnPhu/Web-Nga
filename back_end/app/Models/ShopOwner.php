<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Tymon\JWTAuth\Contracts\JWTSubject;

class ShopOwner extends Authenticatable implements JWTSubject
{
    use HasFactory, HasApiTokens;
    protected $table = 'shop_owners';
    protected $primaryKey = 'id';  
    protected $fillable = [
        'role',
        'phone',
        'email',
        'password',
        'name',
        'image',
        'isActive',
        'otp',
        'otp_expired',
        'confirm',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
