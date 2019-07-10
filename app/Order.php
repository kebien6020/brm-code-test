<?php

namespace App;

use App\ProductBundle;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['quantity', 'product_bundle_id'];

    public function bundle()
    {
      return $this->belongsTo(ProductBundle::class, 'product_bundle_id', 'id');
    }
}
