<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'desc'
    ];

    public function product(): HasOne
    {
        return $this->hasOne(Product::class,'supplier_id');
    }
}
