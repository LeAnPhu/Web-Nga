<?php

namespace App\Models;
use App\Models\Coupons;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CouponUser extends Model
{
    use HasFactory;
    protected $table = 'coupon_users';
    protected $primaryKey = 'id';
    protected $fillable = [
        'coupon_id',
        'user_id',
    ];

    public function coupon()
    {
        return $this->belongsTo(Coupons::class, 'coupon_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
