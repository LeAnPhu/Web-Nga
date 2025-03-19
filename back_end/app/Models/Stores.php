<?php

namespace App\Models;
use App\Models\ShopOwner;
use App\Models\Products;
use App\Models\StoreFollowers;
use App\Models\StoreRating;
use App\Models\Analytics;
use App\Models\Orders;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stores extends Model
{
    use HasFactory;
    protected $table = 'stores';
    protected $primaryKey = 'id';
    protected $fillable = [
        'owner_id',
        'name',
        'img',
        'address',
        'is_active',
    ];

    public function shopOwner()
    {
        return $this->belongsTo(ShopOwner::class, 'owner_id', 'id');
    }
    
    public function products()
    {
        return $this->hasMany(Products::class, 'store_id', 'id');
    }
    public function orders()
    {
        return $this->hasMany(Orders::class, 'store_id');
    }

 
    public function rating()
    {
        return $this->hasMany(StoreRating::class, 'store_id');
    }

    
    public function analytics()
    {
        return $this->hasMany(Analytics::class, 'store_id');
    }

   
    public function storefollowers()
    {
        return $this->hasMany(StoreFollowers::class, 'store_id');
    }
}
