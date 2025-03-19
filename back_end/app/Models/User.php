<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Orders;
use App\Models\StoreFollowers;
use App\Models\StoreRating;
use App\Models\Carts;
use App\Models\Review;
use App\Models\CouponUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasFactory, HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'id';  
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'image',
        'phone',
        'address',
        'isActive',
        'otp',
        'confirm',
        'otp_expired',
        'email_verified_at',
    ];

    public function cart()
    {
        return $this->hasOne(Carts::class, 'user_id');
    }

    public function orders()
    {
        return $this->hasMany(Orders::class, 'user_id');
    }

 
    public function couponUsers()
    {
        return $this->hasMany(CouponUser::class, 'user_id');
    }

 
    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id');
    }

  
    public function followers()
    {
        return $this->hasMany(StoreFollowers::class, 'user_id');
    }
    public function rating()
    {
        return $this->hasMany(StoreRating::class, 'user_id');
    }
    

    protected $hidden = [
        'password',
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
