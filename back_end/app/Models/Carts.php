<?php

namespace App\Models;
use App\Models\User;
use App\Models\CartItems;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'cart_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItems::class, 'cart_id');
    }
}
