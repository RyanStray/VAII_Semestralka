<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataController extends Controller
{
    public function orders() {
        $orders = Orders::all();
        return Inertia::render('Orders/Index', compact('orders'));
    }

    public function customers() {
        return Inertia::render('Customers/Index', []);
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

    public function storeOrder(Request $request)
    {
        //dd($request); //dump data

        $request->validate([
            'orderID' =>  'required|string|max:255|unique:orders',
            'transactionID' =>  'nullable|unique:orders',
            'productID' =>  'nullable|unique:orders',
            'price' =>  'required|numeric',
            'description' =>  'nullable|string',
        ]);

        Orders::create($request->all());
        return redirect()->route('Orders.Index')->with('message', 'Order successfully saved.');
    }

    public function editOrder(Order $order)
    {
        return Inertia::render('Orders/Edit', compact('order'));
    }

    public function destroyOrder(Order $order) {
        $order -> delete();
        return redirect()->route('Orders.Index')->with('message', 'Order deleted successfully.');
    }
}
