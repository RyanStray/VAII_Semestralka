<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    //===================================================    Companies   ===============================================================

    public function index() {
        $companies = Companies::all();
        return Inertia::render('Company/Index', compact('companies'));
    }


    public function add() {
        return Inertia::render('Company/Add', []);
    }

    public function storeCompany(Request $request)
    {
        $request->validate([
            'name' =>  'required|string|max:255',
            'address' =>  'nullable|string|max:255',
            'contact' =>  'nullable|string|max:255',

            //'icon' =>  'nullable|integer',

            'description' =>  'nullable|string',
        ]);

        Companies::create($request->all());
        return redirect()->route('company.index')->with('message', 'Company successfully saved.');
    }

    public function updateCompany(Request $request, Companies $company)
    {
        $request->validate([
            'name' =>  'required|string|max:255|unique:companies,name,' . $company->id,
            'address' =>  'nullable|string|max:255',
            'contact' =>  'nullable|string|max:255',

            //'icon' =>  'nullable|integer',

            'description' =>  'nullable|string',
        ]);

        $company->update($request->all());
        return redirect()->route('company.index')->with('message', 'Company successfully updated.');
    }

    public function editCompany(Companies $company)
    {
        return Inertia::render('Company/Edit', [
            'companies' => $company
        ]);
    }

    public function destroyCompany(Companies $company) {
        $company -> delete();
        return redirect()->route('company.index')->with('message', 'Company deleted successfully.');
    }
}
