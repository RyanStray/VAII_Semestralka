<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index() {
        return Inertia::render('Company/Index', []);
    }
}
