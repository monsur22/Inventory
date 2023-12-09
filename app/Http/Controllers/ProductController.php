<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'supplier'])->get();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id', // Replace 'categories' with your actual category table name
            'supplier_id' => 'required|exists:suppliers,id', // Replace 'suppliers' with your actual supplier table name
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Add validation rules for the image
        ]);

        // Handle the image upload and store the path in the database
        $imagePath = null;
        // if ($request->hasFile('image')) {
        //     $imagePath = $request->file('image')->store('images', 'public');
        // }
        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image');
            if ($uploadedFile->isValid()) {
                $imagePath = $uploadedFile->store('images', 'public');
            } else {
                return response()->json(['error' => 'Invalid file.']);
            }
        } else {
            return response()->json(['error' => 'No file uploaded.']);
        }

        // Create a new Product instance with the validated data
        $product = new Product;
        $product->title = $validatedData['title'];
        $product->description = $validatedData['description'] ?? 'This is a sample product.';
        $product->price = $validatedData['price'];
        $product->quantity = $validatedData['quantity'];
        $product->category_id = $validatedData['category_id'];
        $product->supplier_id = $validatedData['supplier_id'];
        // $product->image_path = $imagePath;
        $product->image_path = 'storage/' . $imagePath;

        // Save the product to the database
        // dd($request->all());
        $product->save();
        $product->load(['category', 'supplier']);
        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201); // 201 Created status code
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product = Product::with(['category', 'supplier'])->find($product->id);
        return response()->json(['product' => $product], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return response()->json(['product' => $product], 200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        $product = Product::find($id);

        // Handle the image update
        $imagePath = $product->image_path; // Get the current image path


        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image');
            if ($uploadedFile->isValid()) {
                // Unlink (delete) the old image
                $oldImagePath = public_path($product->image_path);
                if ($product->image_path && file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
                // Store the new image
                $imagePath = $uploadedFile->store('images', 'public');
                $product->image_path = 'storage/' . $imagePath;
            } else {
                return response()->json(['error' => 'Invalid file.']);
            }
        }
        // Update the product with the provided data
        $product->title = $request->input('title');
        $product->description = $request->input('description', 'This is a sample product.');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->category_id = $request->input('category_id');
        $product->supplier_id = $request->input('supplier_id');
        // $product->image_path = 'storage/' . $imagePath;
        // dd($request->all());
        $product->save();
        $product->load(['category', 'supplier']);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
        ], 200); // 200 OK status code
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            // Delete the product
            $product->delete();

            // Unlink (delete) the associated image file
            if ($product->image_path) {
                $imagePath = public_path($product->image_path);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            return response()->json(['message' => 'Product deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete product'], 500);
        }
    }

    public function getByCategory( $category)
    {
        $products = Product::where('category_id', $category)->get();
        return response()->json($products, 200);
    }

    public function getBySearch( Request $request)
    {
        $searchQuery = $request->input('query');

        $products = Product::where('title', 'like', "%$searchQuery%")
            ->orWhere('description', 'like', "%$searchQuery%")
            ->get();
        return response()->json($products, 200);
    }

}
