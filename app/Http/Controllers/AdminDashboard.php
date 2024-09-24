<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminDashboard extends Controller
{
    public function index() {
        return Inertia::render('Admin/Dashboard');
    }
}
