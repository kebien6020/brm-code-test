<?php

namespace App;

use App\Product;
use Illuminate\Database\Eloquent\Model;

class ProductBundle extends Model
{
    protected $fillable = [
      'product_id',
      'quantity',
      'lot_number',
      'expiration_date',
      'unit_price',
    ];

    public function product()
    {
      return $this->belongsTo(Product::class);
    }
}
