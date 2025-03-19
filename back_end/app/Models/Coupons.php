<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupons extends Model
{
    use HasFactory;
    protected $table = 'coupons';
    protected $primaryKey = 'id';
    protected $fillable = [
        'code',
        'discount',
        'usage_limit',
        'expires_at',
    ];
}
