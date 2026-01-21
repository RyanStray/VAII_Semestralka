<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = [

        'customerID',
        'orderID',
        'transactionID',
        'productID',
        'wasPayed',
        'price',
        'description',

        'companyID',
    ];

    public function customer()
    {
        return $this->belongsTo(Customers::class, 'customerID');
    }
}
