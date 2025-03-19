<?php

namespace App\Models;
use App\Models\User;
use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'product_id',
        'rating',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

 
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }
}
