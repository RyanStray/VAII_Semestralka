<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\Customers;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DataController extends Controller
{
    public function orders() {
        $orders = Orders::all();
        return Inertia::render('Orders/Index', compact('orders'));
    }

    public function customers() {
        $customers = Customers::all();
        return Inertia::render('Customers/Index', compact('customers'));
    }

    public function invoice() {
        return Inertia::render('Invoice/Index', []);
    }

    public function ordersAdd() {
        return Inertia::render('Orders/Add', []);
    }

    public function customersAdd() {
        return Inertia::render('Customers/Add', []);
    }

    public function invoiceAdd() {
        return Inertia::render('Invoice/Add', []);
    }


    //===================================================    Orders   ===============================================================

    public function storeOrder(Request $request)
    {
        //dd($request); //dump data

        $request->validate([
            'orderID' =>  'required|string|max:255|unique:orders',
            'transactionID' =>  'nullable|unique:orders',
            'productID' =>  'nullable|unique:orders',
            'wasPayed' =>  'nullable|boolean',
            'price' =>  'required|numeric',
            'description' =>  'nullable|string',
        ]);

        Orders::create($request->all());
        return redirect()->route('orders.index')->with('message', 'Order successfully saved.');
    }

    public function orderUpdate(Request $request, Orders $order)
    {
        //dd($request);

        $request->validate([
            'orderID' => 'required|string|max:255|unique:orders,orderID,' . $order->id,
            'transactionID' => 'nullable|string|unique:orders,transactionID,' . $order->id,
            'productID' => 'nullable|string|unique:orders,productID,' . $order->id,
            'price' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $order->update($request->all());
        return redirect()->route('orders.index')->with('message', 'Order successfully updated.');
    }

    public function editOrder(Orders $order)
    {
        return Inertia::render('Orders/Edit', [
            'order' => $order
        ]);
    }

    public function destroyOrder(Orders $order) {
        $order -> delete();
        return redirect()->route('orders.index')->with('message', 'Order deleted successfully.');
    }


    //===================================================    Customers   ===============================================================

    public function storeCustomers(Request $request)
    {
        //dd($request); //dump data

        $request->validate([
            'title' =>  'nullable|string|max:50',
            'name' =>  'required|string|max:255',
            'surname' =>  'required|string|max:255',

            'email' =>  'nullable|email:rfc,dns|string|max:255|unique:customers',
            'phone' => [
                'nullable',
                'regex:/^[0-9+\s]+$/',
                'min:6',
                'max:30',
                'unique:customers',
            ],

            'company' =>  'nullable|string|max:255',
            'position' =>  'nullable|string|max:255',

            'description' =>  'nullable|string',
        ]);

        Customers::create($request->all());

        if (Route::currentRouteName() === 'customers.add') {
            return redirect()->route('customers.index')
                ->with('message', 'Customer successfully saved.');
        }
        return redirect()->back()->with('message', 'Customer successfully saved.');
    }

    public function customerUpdate(Request $request, Customers $customer)
    {
        //dd($request);

        $request->validate([
            'title' =>  'nullable|string|max:50',
            'name' =>  'required|string|max:255',
            'surname' =>  'required|string|max:255',

            'email' =>  'nullable|email:rfc,dns|string|max:255|unique:customers,email,' . $customer->id,
            'phone' => [
                    'nullable',
                    'regex:/^[0-9+\s]+$/',
                    'min:6',
                    'max:30',
                    'unique:customers,phone,' . $customer->id,
                ],

            'company' =>  'nullable|string|max:255',
            'position' =>  'nullable|string|max:255',

            'description' =>  'nullable|string',
        ]);

        $customer->update($request->all());
        return redirect()->route('customers.index')->with('message', 'Customer successfully updated.');
    }

    public function editCustomer(Customers $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer
        ]);
    }

    public function destroyCustomer(Customers $customer) {
        $customer -> delete();
        return redirect()->route('customers.index')->with('message', 'Customer deleted successfully.');
    }

    public function getCustomers()
    {
        return Customers::select('id', 'title', 'name', 'surname')->get();
    }

}
