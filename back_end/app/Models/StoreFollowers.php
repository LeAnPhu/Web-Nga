<?php

namespace App\Models;
use App\Models\User;
use App\Models\Stores;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreFollowers extends Model
{
    use HasFactory;

    protected $table = 'store_followers';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',  
        'store_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function store()
    {
        return $this->belongsTo(Stores::class, 'store_id', 'id');
    }
}
