<?php

namespace App\Models;
use App\Models\OrderItems;
use App\Models\Stores;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'store_id',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function store()
    {
        return $this->belongsTo(Stores::class, 'store_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItems::class, 'order_id');
    }
}
