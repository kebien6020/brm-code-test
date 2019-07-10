<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductBundleResource extends JsonResource
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
          'product' => $this->product,
          'quantity' => $this->quantity,
          'lot_number' => $this->lot_number,
          'expiration_date' => $this->expiration_date,
          'unit_price' => $this->unit_price,
        ];
    }
}
