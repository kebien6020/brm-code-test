<?php

namespace App;

use App\ProductBundle;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  protected $fillable = ['name', 'description'];

  public function bundles()
  {
    return $this->hasMany(ProductBundle::class);
  }
}
