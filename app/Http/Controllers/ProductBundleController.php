<?php

namespace App\Http\Controllers;

use App\ProductBundle;
use App\Http\Resources\ProductBundleResource;
use Illuminate\Http\Request;

class ProductBundleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return ProductBundleResource::collection(ProductBundle::paginate(25));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $bund = ProductBundle::create([
        'product_id' => $request->product_id,
        'quantity' => $request->quantity,
        'lot_number' => $request->lot_number,
        'expiration_date' => $request->expiration_date,
        'unit_price' => $request->unit_price,
      ]);

      return new ProductBundleResource($bund);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $bund = ProductBundle::find($id);
      return new ProductBundleResource($bund);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $bund = ProductBundle::find($id);
      $bund->update($request->only([
        'product_id',
        'quantity',
        'lot_number',
        'expiration_date',
        'unit_price',
      ]));

      return new ProductBundleResource($bund);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $bund = ProductBundle::find($id);
      $bund->delete();

      return response()->json(null, 204);
    }
}
