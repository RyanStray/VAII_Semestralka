<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DataController extends Controller
{
    public function orders() {
        return Inertia::render('Orders/Index', []);
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
            'transactionID' =>  'string|max:255|unique:orders',
            'productID' =>  'string|max:255|unique:orders',
            'price' =>  'required|numeric',
            'description' =>  'nullable|string',
        ]);
    }
}
