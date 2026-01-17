<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{
    protected $fillable = [
        'title',
        'name',
        'surname',

        'email',
        'phone',

        'company',
        'position',

        'description',
    ];
}
