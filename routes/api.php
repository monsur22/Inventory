<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api','prefix'=>'auth'], function ($router) {
    Route::post('/register', [AuthController::class, 'createUser']);
    Route::post('/login', [AuthController::class, 'loginUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/email-verify/{confirm_code}', [AuthController::class, 'verifyRegistration']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/reset-password/{confirm_code}', [AuthController::class, 'updatePassword']);

    /***    This  route will be for view password update form  ***
    Route::get('/reset-password/{confirm_code}', [AuthController::class, 'getViewPage']);
    ***    This  route will be for view password update form     ******/
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/user', [AuthController::class, 'user']);
});
Route::resource('category', CategoryController::class);
Route::resource('supplier', SupplierController::class);
Route::resource('product', ProductController::class);
Route::post('/product/update/{id}', [ProductController::class, 'update'])->name('products.update');
Route::resource('customers', CustomerController::class);
Route::resource('orders',OrderController::class);


Route::get('/products/get-by-category/{id}',[ProductController::class,'getByCategory']);
Route::get('/products/get-by-search', [ProductController::class, 'getBySearch']);

Route::post('/test', [TestController::class, 'test']);
