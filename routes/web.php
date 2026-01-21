<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\EmployeesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/invoice', [DataController::class, 'invoice'] ) -> name('invoice.index');

    Route::get('/invoice/add', [DataController::class, 'invoiceAdd'] ) -> name('invoice.add');

    Route::get('/company', [CompanyController::class, 'index'] ) -> name('company.index');
    Route::get('/employees', [EmployeesController::class, 'index'] ) -> name('employees.index');

    //===================================================    Oreders   ===============================================================

    Route::get('/orders', [DataController::class, 'orders'] ) -> name('orders.index');

    Route::get('/orders/add', [DataController::class, 'ordersAdd'] ) -> name('orders.add');

    Route::post('/orders', [DataController::class, 'storeOrder'] ) -> name('orders.store');

    Route::delete('/orders/delete/{order}', [DataController::class, 'destroyOrder'] ) -> name('orders.delete');

    Route::get('/orders/edit/{order}', [DataController::class, 'editOrder'] ) -> name('orders.edit');
    Route::put('/orders/{order}', [DataController::class, 'orderUpdate'] ) -> name('orders.update');

    //===================================================    Customers   ===============================================================

    Route::get('/customers', [DataController::class, 'customers'] ) -> name('customers.index');

    Route::get('/customers/add', [DataController::class, 'customersAdd'] ) -> name('customers.add');

    Route::post('/customers', [DataController::class, 'storeCustomers'] ) -> name('customers.store');

    Route::delete('/customers/delete/{customer}', [DataController::class, 'destroyCustomer'] ) -> name('customers.delete');

    Route::get('/customers/edit/{customer}', [DataController::class, 'editCustomer'] ) -> name('customers.edit');
    Route::put('/customers/{customer}', [DataController::class, 'customerUpdate'] ) -> name('customers.update');


    Route::get('/api/customers', [DataController::class, 'getCustomers']);
});


require __DIR__.'/settings.php';
