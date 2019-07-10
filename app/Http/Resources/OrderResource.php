<?php

namespace App\Http\Resources;

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
          'bundle' => $this->bundle,
          'product_bundle_id' => $this->product_bundle_id,
          'quantity' => $this->quantity,
        ];
    }
}
