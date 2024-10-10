<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if(auth()->user()->hasRole('Administrador')) {
            return Inertia::render('Admin/Dashboard');
        }

        if(auth()->user()->hasRole('Organizacion')) {
            return Inertia::render('Organizacion/Dashboard');
        }

        return redirect()->back();
    }
}
