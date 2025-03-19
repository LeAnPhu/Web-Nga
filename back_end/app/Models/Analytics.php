<?php

namespace App\Models;

use App\Models\Products;
use App\Models\Stores;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analytics extends Model
{
    use HasFactory;

    protected $table = 'analytics';
    protected $primaryKey = 'id';
    protected $fillable = [
        'store_id',
        'product_id',
        'views',
        'purchases',
    ];

    
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id', 'id');
    }

      public function store()
    {
        return $this->belongsTo(Stores::class, 'store_id', 'id');
    }
}
