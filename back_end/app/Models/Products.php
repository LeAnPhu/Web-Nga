<?php

namespace App\Models;
use App\Models\Categories;
use App\Models\Stores;
use App\Models\StoreRating;
use App\Models\CartItems;
use App\Models\OrderItems;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $fillable = [ 
        'store_id',
        'category_id',
        'name',
        'description',
        'price',
        'stock',
        'img',
    ];

    public function store()
    {
        return $this->belongsTo(Stores::class, 'store_id');
    }

   
    public function category()
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }

    
    public function orderItems()
    {
        return $this->hasMany(OrderItems::class, 'product_id');
    }

    
    public function cartItems()
    {
        return $this->hasMany(CartItems::class, 'product_id');
    }

 
    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_id');
    }

   
    public function ratings()
    {
        return $this->hasMany(StoreRating::class, 'product_id');
    }
}
