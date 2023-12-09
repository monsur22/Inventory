<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(Request $request){
        $supplier = new Supplier();
        $supplier->title = $request->title;
        $supplier->desc = $request->desc;
        $supplier->save();

        return response()->json($supplier);
        // dd("call from test contrller");
    }
}
