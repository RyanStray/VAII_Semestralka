<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = [
        'orderID',
        'transactionID',
        'productID',
        'wasPayed',
        'price',
        'description',
    ];
}
