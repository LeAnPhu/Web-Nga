<?php

namespace App\Models;
use App\Models\Stores;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreRating extends Model
{
    use HasFactory;

    protected $table = 'store_ratings';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'store_id',
        'rating',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(Stores::class, 'store_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }
}
