<?php

namespace App\Models;
use App\Models\Carts;
use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItems extends Model
{
    use HasFactory;
    protected $table = 'cart_items';
    protected $primaryKey = 'id';
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'price',
    ];

    public function cart()
    {
        return $this->belongsTo(Carts::class, 'cart_id');
    }

  
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }
}
