<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrgDashboard extends Controller
{
    public function index()
    {
        return Inertia::render('Organizacion/Dashboard');
    }
}
