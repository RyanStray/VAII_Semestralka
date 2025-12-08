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
    Route::get('/orders', [DataController::class, 'orders'] ) -> name('Orders.Index');
    Route::get('/customers', [DataController::class, 'customers'] ) -> name('Customers.Index');
    Route::get('/invoice', [DataController::class, 'invoice'] ) -> name('Invoice.Index');

    Route::get('/orders/add', [DataController::class, 'ordersAdd'] ) -> name('orders.add');
    Route::get('/customers/add', [DataController::class, 'customersAdd'] ) -> name('Customers.Add');
    Route::get('/invoice/add', [DataController::class, 'invoiceAdd'] ) -> name('Invoice.Add');

    Route::get('/company', [CompanyController::class, 'index'] ) -> name('Company.Index');
    Route::get('/employees', [EmployeesController::class, 'index'] ) -> name('Employees.Index');

    Route::post('/orders', [DataController::class, 'storeOrder'] ) -> name('orders.store');

    Route::delete('/orders/delete/{order}', [DataController::class, 'destroyOrder'] ) -> name('orders.delete');

    Route::get('/orders/edit/{order}', [DataController::class, 'editOrder'] ) -> name('orders.edit');

});


require __DIR__.'/settings.php';
