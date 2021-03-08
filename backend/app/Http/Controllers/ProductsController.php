<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {
        $products = Product::all();
        return $products->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
           'name' => 'required|string|unique:products',
           'description' => 'nullable|string',
           'brand' => 'nullable|string',
           'quantity' => 'required|integer',
           'price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }

        $product = new Product();
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->brand = $request->input('brand');
        $product->quantity = $request->input('quantity');
        $product->price = $request->input('price');
        $product->save();

        return $product->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Product $product) {
        return $product->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Product $product) {
        $validator = Validator::make($request->all(), [
           'description' => 'string',
           'brand' => 'string',
           'quantity' => 'integer',
           'price' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }

        $product->description = $request->input('description');
        $product->brand = $request->input('brand');
        $product->quantity = $request->input('quantity');
        $product->price = $request->input('price');
        $product->save();

        return $product->toJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product) {
        $product->delete();
        return response()->json([
            'response' => 'Product deleted with success'
        ], 200);
    }
}
