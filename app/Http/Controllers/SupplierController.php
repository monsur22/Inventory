<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Supplier::all();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $supplier = Supplier::create($request->all());
        return response()->json(['message' => 'Supplier created successfully', 'supplier' => $supplier], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        $supplier = Supplier::find($supplier->id);
        return response()->json([ 'supplier' => $supplier], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return response()->json(['supplier' => $supplier], 200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $supplier->update($request->all());
        return response()->json(['message' => 'Supplier updated successfully', 'supplier' => $supplier], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return response()->json(['message' => 'Delete successfully', 'supplier' => $supplier], 201);

    }
}
