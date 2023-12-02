<?php

use App\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/localhost-80', function () {
    $response = Http::get('http://localhost:8001/localhost-8001');

    $jsonData = $response->json();

    dd($jsonData);
});

Route::get('/product-debug', function () {
    // $jsonData = Product::with('supplier')->get();
    $jsonData = Product::all();
    // foreach ($jsonData as $post) {
    //     // Access the author for each post (N+1 issue)
    //     $supplier = $post->supplier_id; // This triggers a separate query for each post
    // }
    // return view('product')->with($jsonData);
    foreach ($jsonData as $post) {
        $user = $post->supplier_id; // Access the user for each post (N+1 issue)
    }
    return view('product', compact('jsonData','user'));

    // dd($jsonData);
});