<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::with(['user'])->get();
        return response()->json($customers);
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
        DB::beginTransaction();

        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email', // Check for unique email in the 'users' table
            ]);
            // Step 1: Create a new User
            $user = new User();
            // $user->name = $request->input('user_name');
            $user->email = $validatedData['email'];;
            $user->password = bcrypt('temporary_password');
            $user->save();

            // Step 2: Retrieve the newly created User's ID
            $user_id = $user->id;

            // Step 3: Create a new Customer associated with the User
            $customer = new Customer();
            $customer->name = $validatedData['name'];
            $customer->phone = $request->input('phone');
            $customer->user_id = $user_id;
            $customer->save();

            // If everything is successful, commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'User and Customer created successfully',
                'customer' => $customer,
            ], 201);
        } catch (\Exception $e) {
            // Something went wrong, so roll back the transaction
            DB::rollBack();
            // Handle the exception as needed
            return response()->json(['error' => 'Error creating User and Customer']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $customer = Customer::find($customer->id);
        return response()->json([ 'customer' => $customer], 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return response()->json(['customer' => $customer], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->all());
        return response()->json(['message' => 'customer updated successfully', 'customer' => $customer], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(['message' => 'Delete successfully', 'customer' => $customer], 201);
    }
}
