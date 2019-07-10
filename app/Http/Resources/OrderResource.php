<?php

namespace App\Http\Resources;

use App\Http\Resources\ProductBundleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'bundle' => new ProductBundleResource($this->bundle),
          'product_bundle_id' => $this->product_bundle_id,
          'quantity' => $this->quantity,
          'created_at' => $this->created_at,
        ];
    }
}
